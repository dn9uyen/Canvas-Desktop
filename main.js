const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const https = require('https');

function createWindow () {
// Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {nodeIntegration: true}
    })
// Load html
    win.loadFile('index.html')
// Disable menu bar at top
    win.setMenu(null)
// dev tools for testing
    win.webContents.openDevTools()
}
// Create window after initialization
app.on('ready', () => {
    createWindow()

    //new Notification("testing", { body: "test" });
});

<<<<<<< Updated upstream
`
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})


ipcMain.on('synchronous-message', (event, arg) => { 
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

`

let token = 0

ipcMain.on('courses', (event, token1) => { 
  token = token1
  requestCanvas(token1, courses)
  event.returnValue = true
})

function requestCanvas(token, resource){
  console.log(token)


  var getReq = https.request('https://dublinusd.instructure.com/api/v1/courses?access_token='.concat(token), function(res) {
    console.log("\nstatus code: ", res.statusCode);
    res.on('data', function(data) {
        console.log( JSON.parse(data) );
=======
// TODO: add to settings file
global.token = "";
global.loggedIn = false;

// Request courses json
ipcMain.on("jsonData", (event, arg) => {
    // check if logged in because function is also called during login
    if (!global.loggedIn) {global.token=arg[1]; global.loggedIn=true;}
    requestCanvas(arg[0], function(json) {
        event.reply("jsonData", json);
    });
    
});

function requestCanvas(resource, callback) {
    // request canvas with the api location
    const url = "https://dublinusd.instructure.com/api/v1/"+resource+"?access_token="+global.token;
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
            console.log("Error "+response.statusCode);
        }
            
>>>>>>> Stashed changes
    });
  });
  
  //end the request
  getReq.end();
  getReq.on('error', function(err){
    console.log("Error: ", err);
  });




  `https.get('https://dublinusd.instructure.com/api/v1/courses?access_token=', token, (resp) => {
    let data = '';

    // Chunk Receive
    resp.on('data', (chunk) => {
      data += chunk;
    });`
  
}

<<<<<<< Updated upstream


app.on('window-all-closed', () => {
  app.quit()
})
=======
app.on("window-all-closed", () => {
    app.quit();
});
>>>>>>> Stashed changes
