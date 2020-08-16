const { ipcRenderer } = require("electron");
//console.log(ipcRenderer.sendSync("synchronous-message", "ping")) // prints "pong"

//ipcRenderer.on("asynchronous-reply", (event, arg) => {
//  console.log(arg) // prints "pong"
//})
//ipcRenderer.send("asynchronous-message", "ping")

function requestData(resource, data) {
    ipcRenderer.send(resource, data);
}

// Login listener
document.getElementById("submit").addEventListener("click", function(){ requestData("courses", document.getElementById("apiToken").value);});

//Dashboard listeners
//document.getElementById("idhere").addEventListener("click", function(){ functionName(args);});
//document.getElementById("idHere").addEventListener("click", function(){ functionName(args);});
//document.getElementById("idhere").addEventListener("click", function(){ functionName(args);});
//document.getElementById("idHere").addEventListener("click", function(){ functionName(args);});

ipcRenderer.on("courses", (event, jsonData) => {
    console.log(jsonData);
    console.log("test");
});



