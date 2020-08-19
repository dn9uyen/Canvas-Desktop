const { ipcRenderer } = require("electron");

global.loggedIn = false;

// ipcRenderer.send("jsonData", "resourceNameHere", tokenHere);

// Handle response
ipcRenderer.on("jsonData", (event, jsonData, resource) => {
    ipcRenderer.send("openNewPage", resource);
    console.log(jsonData);
});

