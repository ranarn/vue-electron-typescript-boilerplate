import { app, protocol, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import log from 'electron-log';

const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

app.allowRendererProcessReuse = true;

let mainWindow: BrowserWindow | undefined;

const createMainWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'Boilerplate example app',
    width: 500,
    height: 400,
    resizable: isDevelopment,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as any,
      webSecurity: false
    }
  });

  mainWindow.setMenu(null);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    mainWindow.loadURL('app://./index.html');
  }
};

app.on('ready', async () => {
  if (isDevelopment) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (error) {
      log.error('Vue Devtools failed to install:', error.toString());
    }
    globalShortcut.register('ctrl+shift+i', () => { mainWindow?.webContents.openDevTools({ mode: 'detach', activate: false }); });
  }

  createProtocol('app');

  await createMainWindow();
});

ipcMain.on('msg:hello', async (e: any, payload: string) => {
  setTimeout(() => {
    mainWindow?.webContents.send('msg:reply', payload);
  }, 2000);
});

app.on('window-all-closed', () => app.quit());
