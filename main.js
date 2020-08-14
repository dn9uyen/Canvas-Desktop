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



app.on('window-all-closed', () => {
  app.quit()
})