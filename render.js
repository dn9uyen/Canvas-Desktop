<<<<<<< Updated upstream
const { ipcRenderer } = require('electron')
//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

//ipcRenderer.on('asynchronous-reply', (event, arg) => {
//  console.log(arg) // prints "pong"
//})
//ipcRenderer.send('asynchronous-message', 'ping')

document.getElementById("submit").addEventListener("click", submitToken);

function submitToken() {
  ipcRenderer.send('courses', document.getElementById("apiToken").value);
}

ipcRenderer.on('courses', (event, arg) => {
  if (arg){
    console.log('it works')
  }
  console.log(arg)
})

=======
const { ipcRenderer } = require("electron");

global.loggedIn = false;

function requestData(resource, token) {
    ipcRenderer.send("jsonData", [resource, token]);
}

// Login listener
var _listener = function() {
    requestData("courses", document.getElementById("apiToken").value);
};
document.getElementById("submit").addEventListener("mousedown", _listener);

//Dashboard listeners
//document.getElementById("idhere").addEventListener("click", function(){ functionName(args);});
//document.getElementById("idHere").addEventListener("click", function(){ functionName(args);});
//document.getElementById("idhere").addEventListener("click", function(){ functionName(args);});
//document.getElementById("idHere").addEventListener("click", function(){ functionName(args);});

// Handle response
ipcRenderer.on("jsonData", (event, jsonData) => {
    console.log(jsonData);
    if (!global.loggedIn) {global.loggedIn = true; document.getElementById("submit").removeEventListener("mousedown", _listener);}
    // handle ui events here
});

>>>>>>> Stashed changes
