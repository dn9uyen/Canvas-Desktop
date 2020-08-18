const { ipcRenderer } = require("electron");

global.loggedIn = false;

// ipcRenderer.send("jsonData", ["resourceNameHere", tokenHere]);
// ipcRenderer.send("openNewPage", );

// Login listener
var _listener = function() {
    ipcRenderer.send("jsonData", ["courses", document.getElementById("apiToken").value]);
};
document.getElementById("submit").addEventListener("mousedown", _listener);

// Handle response
ipcRenderer.on("jsonData", (event, args) => {
    // args[0] is json data, args[1] is resource name
    ipcRenderer.send("openNewPage", args[1]);
    if (!global.loggedIn) {global.loggedIn = true; document.getElementById("submit").removeEventListener("mousedown", _listener);}
    // handle ui events here
});

