// preload.cjs
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Fichier -> ouvrir
  openJson: async () => {
    const res = await ipcRenderer.invoke('open-json');
    if (!res) return null;

    // peut être du JSON ou du texte (le renderer a un parse "tolérant")
    const payload = res.data;
    let parsed = payload;
    if (typeof payload === 'string') {
      try { parsed = JSON.parse(payload); } catch { parsed = payload; }
    }

    // normalisation basique
    let records = [];
    if (Array.isArray(parsed)) records = parsed;
    else if (parsed && Array.isArray(parsed.records)) records = parsed.records;
    else if (parsed && Array.isArray(parsed.data)) records = parsed.data;
    else if (parsed && parsed.records == null) records = parsed; // déjà “array-like”

    return { records, filePath: res.filePath };
  },

  // Fichier -> sauvegarder (même chemin si possible, sinon boîte de dialogue)
  saveJson: async ({ data, filePath = null, saveAs = false } = {}) => {
    const savedPath = await ipcRenderer.invoke('save-json', { data, filePath, saveAs });
    return savedPath; // null si annulé
  },

  // charger un fichier embarqué (dev: app/, prod: resources/app/)
  loadEmbedded: async (name) => {
    return await ipcRenderer.invoke('load-embedded', name);
  },

  // callbacks menu
  onMenuOpen: (cb) => ipcRenderer.on('menu-open', cb),
  onMenuSave: (cb) => ipcRenderer.on('menu-save', cb),
  onMenuSaveAs: (cb) => ipcRenderer.on('menu-save-as', cb)
});

