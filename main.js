const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const https = require('https');

var win = BrowserWindow;

function createWindow() {
// Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {nodeIntegration: true}//, contextIsolation: true}
    })
    win.loadURL("file://" + __dirname + "/index.html")
    win.removeMenu();
    win.webContents.openDevTools() // dev tool, remove later
}
// Create window after initialization
app.on('ready', () => {
    createWindow()
});

ipcMain.on("openNewPage", (event, page) => {
    win.loadURL("file://" + __dirname + "/" + page + ".html");
});

// TODO: add to settings file
global.loggedIn = false;

// Request json data
ipcMain.on("jsonData", (event, resourceAndToken) => {
    // args[0] is resource name, arg[1] is token
    requestCanvas(resourceAndToken, function(json) {
        // return resource string
        event.reply("jsonData", json, resourceAndToken[0]);
    });
    
});

function requestCanvas(resourceAndToken, callback) {
    // request canvas with the api location
    console.log(global.token);
    console.log(resourceAndToken[0]);
    console.log(resourceAndToken[1]);
    const url = "https://dublinusd.instructure.com/api/v1/"+resourceAndToken[0]+"?access_token="+resourceAndToken[1];
    https.get(url, (response) => {
        if (response.statusCode==200) {
            console.log("valid request");
            var data = "";
            // data comes in stream
            response.on("data", chunk => {
                data += chunk;
            });
            response.on("end", () => {
                // callback after request is finished
                callback(JSON.parse(data));
            });
        } else {
            console.log("Error:"+response.statusCode);
            global.loggedIn=false;
        }
            
    });
  };

app.on("window-all-closed", () => {
    app.quit();
});
