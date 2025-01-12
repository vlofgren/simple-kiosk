const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

function getStartUrl() {

  const isPackaged = app.isPackaged

  let args
  if (isPackaged) {
    // When running as AppImage/executable, arguments start after the executable path
    args = process.argv.slice(1)
  } else {
    // In development, first two args are electron and script path
    args = process.argv.slice(2)
  }

  // Check if URL was provided
  const urlArg = args[0]
  if (urlArg) {
    try {
      // Validate URL
      new URL(urlArg)
      return urlArg
    } catch (e) {
      console.error('Invalid URL provided:', urlArg)
    }
  }

  // Fallback URL if none provided or invalid
  return 'https://en.wikipedia.org/'
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    },
    frame: true,
    // Prevent creation of new windows
    nativeWindowOpen: false
  })

  let exitFullScreen = () => {
    if (!win.isFocused()) return

    win.setFullScreen(false)
  }

  let toggleFullScreen = () => {
    if (!win.isFocused()) return

    win.setFullScreen(!win.isFullScreen())
  }
  let reload = () => {
    if (!win.isFocused()) return

    win.reload()
  }
  let quit = () => {
    if (!win.isFocused()) return

    app.quit()
  }

  // Full screen shortcuts
  globalShortcut.register('F11', toggleFullScreen)
  globalShortcut.register('CommandOrControl+F', toggleFullScreen)
  globalShortcut.register('Escape', exitFullScreen)

  // Reload shortcuts
  globalShortcut.register('F5', reload)
  globalShortcut.register('CommandOrControl+R', reload)

  // App termination shortcut
  globalShortcut.register('CommandOrControl+Q', quit)

  // Load the website
  win.loadURL(getStartUrl())

  // Prevent new window creation from within the page
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))

  win.setMenu(null)
  win.setFullScreen(true)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


/* Uncomment me to add credentials for basic auth 
app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault();

  let username='username'
  let password='password'

  callback(username, password);
});
*/

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

