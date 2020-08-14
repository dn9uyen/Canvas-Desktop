const { ipcRenderer } = require('electron')
//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

//ipcRenderer.on('asynchronous-reply', (event, arg) => {
//  console.log(arg) // prints "pong"
//})
//ipcRenderer.send('asynchronous-message', 'ping')

document.getElementById("submit").addEventListener("click", submitToken);

function submitToken() {
  ipcRenderer.send('courses', document.getElementById("apiToken").value);
}

ipcRenderer.on('courses', (event, arg) => {
  if (arg){
    console.log('it works')
  }
  console.log(arg)
})

