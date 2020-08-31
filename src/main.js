const { app, BrowserWindow, ipcMain } = require('electron')
const https = require('https');
const path = require('path');
const url = require('url');

var win = BrowserWindow;
// TODO: add to settings file
global.tokenSaved = false;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {nodeIntegration: true}//, contextIsolation: true}
    })
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);
    win.removeMenu();
    win.webContents.openDevTools({mode: "detach"});
}
app.on('ready', () => {
    createWindow()
});
app.on("window-all-closed", () => {
    app.quit();
});

function checkTokenValidity(statusCode) {
    if (statusCode===200 && global.tokenSaved===false) {
        return true;
        // saveToken()
        // global.tokenSaved = true
    } else if (statusCode===401 && global.tokenSaved){
        return false;
        // saved token is invalid, delete it, throw incorrect token msg
    } else if (statusCode===401 && !global.tokenSaved) {
        return false;
        // token invalid and not saved, throw incorrect token msg
    }
}

function requestCanvas(resource, token, callback) {
    https.get("https://dublinusd.instructure.com/api/v1/"+resource+"?access_token="+token, (response) => {
        if (checkTokenValidity(response.statusCode)) {
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

