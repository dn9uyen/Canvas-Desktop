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
ipcRenderer.on("jsonData", (event, jsonData, resource) => {
    ipcRenderer.send("openNewPage", resource);
    console.log(jsonData);
    // if (!global.loggedIn) {global.loggedIn = true; document.getElementById("submit").removeEventListener("mousedown", _listener);}
    // handle ui events here
});

