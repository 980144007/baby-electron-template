// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain, dialog, Notification } = require('electron')
const path = require('path')

//这里的配置手动写的，也可以使用cross-env插件配置
const mode = 0

/*隐藏electron创听的菜单栏*/
Menu.setApplicationMenu(null)

async function toNotification () {
    const n = new Notification({
        title: "哦啦啦",
        body: "发财发财"
    })
    n.show()
    // const { canceled, filePaths } = await dialog.showOpenDialog({
    //     properties: [],
    // })
    // if (!canceled) {
    //     return filePaths[0]
    // } 
    
}
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        frame: true /*是否展示顶部导航  去掉关闭按钮  最大化最小化按钮*/ ,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')  修改成如下

    mainWindow.loadURL(mode === 0 ? 'http://localhost:80' : `file://${path.join(__dirname, '../dist/index.html')}`)

    // Open the DevTools.
    if (mode === 0) {
        mainWindow.webContents.openDevTools()
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle('toNotification', toNotification);
    createWindow()

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})