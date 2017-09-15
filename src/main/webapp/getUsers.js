
class ChatAppUsers {
   constructor() {
       this.users = document.querySelector("#users");
       //console.log("ChatAppUsers");
       this.load();     
    }  
    load() {
        //console.log("load ok");
        fetch('api/users/get')
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Failed to load list of users");
            })
            .then(json => this.addUsers(json))
            .catch(e => console.log("Error!: " + e.message));           
    }
    addUsers(json) {
        this.users.innerHTML = '';
        for(let i = 0; i < json.length; i++) {
            //console.log(json[i].user);
            let li = document.createElement('li');
            li.innerHTML=json[i].username;  
            let a = document.createElement('a');
            a.href = "conversation.html?receiver=" + json[i].username;
            a.appendChild(li);                     
            this.users.appendChild(a);
        }  
    }
}
let chatAppUsers = new ChatAppUsers();
        
