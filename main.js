const { app, BrowserWindow, ipcMain } = require('electron')
const https = require('https');

var win = BrowserWindow;
// TODO: add to settings file
global.loggedIn = false;

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

function requestCanvas(resource, token, callback) {
    https.get("https://dublinusd.instructure.com/api/v1/"+resource+"?access_token="+token, (response) => {
        if (response.statusCode===200) {
            // save data chunks
            let data = "";
            response.on("data", chunk => {data += chunk;});
            response.on("end", () => {callback(JSON.parse(data));});
        } else {console.log("Error:"+response.statusCode);}
    });
  };

// Request json data
ipcMain.on("requestJsonData", (event, resource, token) => {
    requestCanvas(resource, token, function(json) {
        event.reply("jsonData", json, resource);
    });
    
});
