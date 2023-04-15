let ws;
let user;
function newRoom(){
    // calling the ChatServlet to retrieve a new room ID
    let callURL= "http://localhost:8080/CourseProject-1.0-SNAPSHOT/chat-servlet";
    fetch(callURL, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
        },
    })
        .then(response => response.text())
        .then(response => enterRoom(response)); // enter the room with the code
}
function enterRoom(){

    // refresh the list of rooms
    let code = document.getElementById("room-code").value;

    // create the web socket
    ws = new WebSocket("ws://localhost:8080/CourseProject-1.0-SNAPSHOT/ws/"+code);


    // parse messages received from the server and update the UI accordingly
    ws.onmessage = function (event) {
        console.log(event.data);
        // parsing the server's message as json
        let message = JSON.parse(event.data);

        // handle message
        document.getElementById("log").value += message.message + "\n";

        }
}
document.getElementById("input").addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        let request = {"type":"chat", "msg":event.target.value};
        ws.send(JSON.stringify(request));
        event.target.value = "";

        let log = document.getElementById("log");
        log.appendChild(document.createTextNode(`[${user}]: ${event.target.value}`));

    }
});
//"[" + timestamp() + "] " +

function timestamp() {
    var d = new Date(), minutes = d.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return d.getHours() + ':' + minutes;
}

//This function download the entirety of the chat and saves it locally on a text file.
function downloadChat() {

    //Code used to create the text file that will have the chat log.
    let log = document.getElementById("log");
    let file = new Blob([log.innerHTML], {type: 'text/plain'})
    let a = document.createElement("a");
    a.download = "log-chatroomname.txt";
    a.href = window.URL.createObjectURL(file);
    a.click();
}

//This function removes the user from the chatroom as well as remove it from the list.
function removeChat() {
    if (confirm("Are you sure you want to leave the Chatroom?")) {
        //Will remove the chatroom from the list on the client
        let bt = document.getElementById("chatroomBT");
        bt.remove();

        //Remove the name of the chatroom from the title message
        let p = document.getElementById("chatroomTitle");
        p.innerHTML = "You are chatting in room ";

        //Cleans up the content within the chat log
        let log = document.getElementById("log");
        log.innerHTML = "";


    } else {
        //Will just cancel the process, nothing changes
    }

}

function accessRoom(title){
    //Get the p tag so you can add the new title
    let p = document.getElementById("chatroomTitle");
    let node = document.createTextNode(title);
    p.appendChild(node);

    //Add all the chatroom Text for testing purposes
    let log = document.getElementById("log");
    log.appendChild(document.createTextNode("Chatroom 'Test Room' has been created!"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("[Carlos]: H"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("[Carlos]: E"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("[Carlos]: L"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("[Carlos]: L"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("[Carlos]: O"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("Nirujan has entered the chat!"));
    log.appendChild(document.createTextNode("\n"));
    log.appendChild(document.createTextNode("[Nirujan]: Hey"));

}