const { app, BrowserWindow, Notification, powerMonitor } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'

const showNotification = (body) => {
  new Notification({ title: NOTIFICATION_TITLE, body: `source ${body}` }).show()
}

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
    win.webContents.openDevTools()
  }

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // lock = actual locking of screen + screensaver - seems most relevant

    powerMonitor.on('lock-screen', () => {
        console.log('screen was locked')
    })

    powerMonitor.on('unlock-screen', () => {
        console.log('screen was unlocked')
    })

    // resume + suspend regards sleep - not sure if needed as these states can probably be triggered whilst machine is locked

    powerMonitor.on('resume', () => {
        console.log('screen was resumed')
    })

    powerMonitor.on('suspend', () => {
        console.log('screen was suspended')
    })

    // use setTimeout to trigger first + successive interval calls of showNotification after time in ms
   
    setTimeout(() => setInterval(() => showNotification('hey maybe take a break :)'), 5000), 5000)
})