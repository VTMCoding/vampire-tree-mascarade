// main.js
const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs').promises;

app.setAppUserModelId('fr.vtm.lignages'); // pour Windows (icône/notifications correctes)

// mémorise le fichier courant par fenêtre pour "Save"
const lastPathByWC = new Map();

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    // sous Linux la fenêtre peut utiliser une icône PNG
    icon: path.join(__dirname, 'build', 'icon.png')
  });

  // Charge l'UI
  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  return win;
}

// ----- IPC: fichiers -----

ipcMain.handle('open-json', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const res = await dialog.showOpenDialog(win, {
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (res.canceled || !res.filePaths.length) return null;

  const filePath = res.filePaths[0];
  const text = await fs.readFile(filePath, 'utf8');

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // le renderer fait déjà un parse "tolérant", on renvoie le texte brut
    data = text;
  }

  lastPathByWC.set(event.sender.id, filePath);
  return { data, filePath };
});

ipcMain.handle('save-json', async (event, msg) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const current = lastPathByWC.get(event.sender.id) || null;

  let target = (!msg?.saveAs && (msg?.filePath || current)) || null;

  if (!target) {
    const res = await dialog.showSaveDialog(win, {
      defaultPath: msg?.filePath || current || 'vtm_db.json',
      filters: [{ name: 'JSON', extensions: ['json'] }]
    });
    if (res.canceled || !res.filePath) return null;
    target = res.filePath;
  }

  // msg.data est attendu comme Array|Object -> on stringifie ici
  const payload = typeof msg?.data === 'string'
    ? msg.data
    : JSON.stringify(msg?.data ?? {}, null, 2);

  await fs.writeFile(target, payload, 'utf8');
  lastPathByWC.set(event.sender.id, target);
  return target;
});

// lecture de fichiers embarqués (production/asar ou dev)
ipcMain.handle('load-embedded', async (_event, name) => {
  const tryPaths = [
    path.join(process.resourcesPath, 'app', name),      // production
    path.join(__dirname, 'app', name)                   // dev
  ];
  for (const p of tryPaths) {
    try {
      const txt = await fs.readFile(p, 'utf8');
      try { return JSON.parse(txt); } catch { return txt; }
    } catch { /* continue */ }
  }
  return null;
});

// ----- Menu app (Ctrl+O / Ctrl+S / Ctrl+Shift+S) -----
function buildMenu() {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.name,
      submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }]
    }] : []),
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Ouvrir…',
          accelerator: 'Ctrl+O',
          click: (_item, win) => win && win.webContents.send('menu-open')
        },
        {
          label: 'Enregistrer',
          accelerator: 'Ctrl+S',
          click: (_item, win) => win && win.webContents.send('menu-save')
        },
        {
          label: 'Enregistrer sous…',
          accelerator: 'Ctrl+Shift+S',
          click: (_item, win) => win && win.webContents.send('menu-save-as')
        },
        { type: 'separator' },
        { role: 'quit', label: 'Quitter' }
      ]
    },
    {
      label: 'Affichage',
      submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }, { role: 'resetZoom' }, { role: 'togglefullscreen' }]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ----- Cycle app -----
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const w = BrowserWindow.getAllWindows()[0];
    if (w) { if (w.isMinimized()) w.restore(); w.focus(); }
  });

  app.whenReady().then(() => {
    buildMenu();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
