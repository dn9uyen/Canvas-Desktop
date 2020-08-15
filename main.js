const { app, BrowserWindow, ipcMain } = require("electron"); // include Notification for notifications
const https = require("https");

function createWindow () {
// Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {nodeIntegration: true}
    });
    // Load html
    win.loadFile("index.html");
    // Disable menu bar at top
    win.setMenu(null);
    // dev tools for testing
    win.webContents.openDevTools();
}
// Create window after initialization
app.on("ready", () => {
    createWindow();
// new Notification("testing", { body: "test" });
});

`
ipcMain.on("asynchronous-message", (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply("asynchronous-reply", "pong")
})


ipcMain.on("synchronous-message", (event, arg) => { 
    console.log(arg) // prints "ping"
    event.returnValue = "pong"
})

`;

global.token = 0;

ipcMain.on("courses", (event, token) => { 
    global.token = token;
    requestCanvas("courses");
    event.returnValue = true;
});

function requestCanvas(resource){
    // request an api resource from canvas
    let base = "https://dublinusd.instructure.com/api/v1/";
    let header = "?access_token=" + global.token;

    let getRequest = https.request(base + resource + header, function(response) {
        console.log("\nstatus code: ", response.statusCode);    // for testing, remove later
        response.on("data", function(data) {
            //console.log(JSON.parse(data));    // for testing, remove later
        });
    });

    // end the request
    getRequest.end();
    getRequest.on("error", function(err){
        console.log("Error: ", err);
    });
}



app.on("window-all-closed", () => {
    app.quit();
});