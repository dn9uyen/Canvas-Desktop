const { app, BrowserWindow, Notification } = require('electron')

function createWindow () {
// Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {nodeIntegration: true}
    })
// Load html
    win.loadFile('index.html')

    win.webContents.openDevTools()
}
// Create window after initialization
app.on('ready', () => {
    createWindow()

    //new Notification("testing", { body: "test" });
});


// Quit when all windows are closed
app.on('window-all-closed', () => {
    app.quit()
})