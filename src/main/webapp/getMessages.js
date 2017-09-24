class ChatAppMessages {
    
    constructor() {
        this.messages = document.querySelector("#messages");
        this.message = document.querySelector("#message");

        var sender = this.getCookie("ChatApp");
        var receiver = this.getQueryVariable("receiver");
        
        this.lastMessageID = 0;


        this.message.onchange = event => {
            fetch('api/conversations/add?sender=' + sender + '&receiver=' + receiver + '&messageBody=' + event.target.value,
                    {
                        method: 'POST',
                        //body : JSON.stringify(new Message()),
                        //headers: {'Content-Type' : 'application/json; charset=UTF-8'}
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }

                        throw new Error("Failed to send message " + event.target.value);
                    })
                    .then(message => {
                        this.message.value = "";
                    })
                    .catch(exception => console.log("Error: " + exception));
        };

        this.intervalID = setInterval(
                (function (self) {         
                    return function () {  
                        self.load(sender, receiver); 
                    }
                })(this),
                500    
                );

    }
    
    // Fetches the messages between two users stored in the database
    load(sender, receiver) {
        fetch('api/conversations/getConversation?user1=' + sender + '&user2=' + receiver)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Failed to load list of users");
                })
                .then(json => this.addMessages(json, sender, receiver))
                .catch(e => console.log("Error!: " + e.message));
    }
    
    // Adds messages to the user interface so that the users can see them.
    // Only adds a message if it is a new message. If the message is already
    // on screen it will ignore it.
    addMessages(json, sender, receiver) {
        if(this.lastMessageID == 0){
            this.messages.innerHTML = '';
        }
        
        console.log(this.lastMessageID);
        for (let i = 0; i < json.length; i++) {
            if(this.lastMessageID < json[i].messageID){
                let li = document.createElement('li');
                li.innerHTML = json[i].messageBody;
                if(json[i].sender == sender){
                li.setAttribute("class", "left-float");
                }
                else{
                    li.setAttribute("class", "right-float"); 
                }
                
                this.messages.appendChild(li);
                this.scrollToBottom();
                
                this.lastMessageID = json[i].messageID;
            }
        }
    }

    // Scrolls the conversation window to the bottom to show that a new message
    // have been received.
    scrollToBottom() {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
        
    }

    // Gets the variables from the URL
    getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return(false);
    }

    // Used to check if a user should have access to this page. 
    // If not the user will be redirected to the login page.
    checkCookie() {
        var user = getCookie("ChatApp");
        if (user != "") {
            document.getElementById("name").innerHTML = "Welcome, " + user;
        } else {
            window.location.href = 'index.html';
        }
    }
    
    // Returns the username that is stored in the cookie.
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

}
let chatAppMessages = new ChatAppMessages();