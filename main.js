const { app, BrowserWindow, ipcMain } = require('electron')
const https = require('https');
// const { stat } = require('fs');

var win = BrowserWindow;
// TODO: add to settings file
global.tokenSaved = false;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {nodeIntegration: true}//, contextIsolation: true}
    })
    win.loadURL("file://" + __dirname + "/index.html")
    win.removeMenu();
    win.webContents.openDevTools() // dev tool, remove later
}
app.on('ready', () => {
    createWindow()
});
app.on("window-all-closed", () => {
    app.quit();
});

function checkTokenValidity(statusCode) {
    if (statusCode===200 && global.tokenSaved===false) {
        // saveToken()
        // global.tokenSaved = true
    } else if (statusCode===401 && global.tokenSaved){
        // saved token is invalid, delete it, throw incorrect token msg
    } else if (statusCode===401 && !global.tokenSaved) {
        // token invalid and not saved, throw incorrect token msg
    }
}

function requestCanvas(resource, token, callback) {
    https.get("https://dublinusd.instructure.com/api/v1/"+resource+"?access_token="+token, (response) => {
        checkTokenValidity(response.statusCode);
        if (response.statusCode===200) {
            let data = "";
            response.on("data", chunk => {data += chunk;});
            response.on("end", () => {callback(JSON.parse(data));});
        } else {console.log("Error:"+response.statusCode);}
    });
  };

ipcMain.on("requestJsonData", (event, resource, token) => {
    requestCanvas(resource, token, function(json) {
        event.reply("jsonData", json, resource);
    });
    
});

