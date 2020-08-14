const { app, BrowserWindow, Notification } = require('electron')
const https = require('https');
const http = require('http')

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




https.get('https://dublinusd.instructure.com/api/v1/courses?access_token=<ACCESS-TOKEN>', (resp) => {
  let data = '';

  // Chunk Receive
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // JSON Parser
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


// Quit when all windows are closed
app.on('window-all-closed', () => {
    app.quit()
})