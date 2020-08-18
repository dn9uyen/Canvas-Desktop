const { ipcRenderer } = require("electron");

global.loggedIn = false;

function requestData(resource, token) {
    // request json data from requestCanvas()
    ipcRenderer.send("jsonData", [resource, token]);
    console.log("test")
}

function openNewPage(page) {
    // open new page in main.js
    ipcRenderer.send("openNewPage", page);
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
ipcRenderer.on("jsonData", (event, args) => {
    // args[0] is json data, args[1] is resource name
    openNewPage(args[1]);
    if (!global.loggedIn) {global.loggedIn = true; document.getElementById("submit").removeEventListener("mousedown", _listener);}
    // handle ui events here
});

