
class ChatAppMessages {
    constructor() {
        this.messages = document.querySelector("#messages");
        this.message = document.querySelector("#message");

        var sender = this.getCookie("ChatApp");
        var receiver = this.getQueryVariable("receiver");

        this.message.onchange = event => {
            fetch('api/conversations/add?sender=' + sender + '&receiver=' + receiver + '&messageBody=' + event.target.value,
                    {
                        method: 'POST',
                        //body : JSON.stringify(new Message('Kristian',event.target.value)),
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
        //this.load(sender, receiver);

        this.intervalID = setInterval(
                (function (self) {         //Self-executing func which takes 'this' as self
                    return function () {   //Return a function in the context of 'self'
                        self.load(sender, receiver); //Thing you wanted to run as non-window 'this'
                    }
                })(this),
                500     //normal interval, 'this' scope not impacted here.
                );

        /*
         this.worker = new Worker("worker.js");
         this.worker.postMessage({"sender" : sender, "receiver" : receiver});
         
         this.worker.onmessage = event => {
         this.forum.innerHTML = '';
         let ul = document.createElement('ul');
         event.data.map(message => {
         let li = document.createElement('li');
         li.innerHTML = `${message.user} - ${message.text}`;
         ul.appendChild(li);
         });
         this.forum.appendChild(ul);
         this.forum.scrollTop = this.forum.scrollHeight;
         };  
         */

    }
    load(sender, receiver) {
        fetch('api/conversations/getConversation?user1=' + sender + '&user2=' + receiver)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Failed to load list of users");
                })
                .then(json => this.addMessages(json))
                .catch(e => console.log("Error!: " + e.message));
    }
    addMessages(json) {
        this.messages.innerHTML = '';
        for (let i = 0; i < json.length; i++) {
            //console.log(json[i].user);
            let li = document.createElement('li');
            li.innerHTML = json[i].messageBody;
            //let a = document.createElement('a');
            //a.href = "conversation.html?receiver=" + json[i].user;
            //a.appendChild(li);                     
            this.messages.appendChild(li);
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
        
    }

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

    checkCookie() {
        var user = getCookie("ChatApp");
        if (user != "") {
            document.getElementById("name").innerHTML = "Welcome, " + user;
            //alert("Welcome again " + user);
        } else {
            window.location.href = 'index.html';
            //user = prompt("Please enter your name:", "");
            //if (user != "" && user != null) {
            //    setCookie("username", user, 365);
            //}
        }
    }

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