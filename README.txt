# VTM Lignages — Version Web (statique)

Ce dossier contient une version **hébergeable telle quelle** du visualiseur/éditeur de lignages :
- `index.html` (application)
- `vtm_db.json` (jeu de données par défaut)
- `choice.json` (listes de valeurs)

## Lancer en local
Ouvrez simplement `index.html` dans un navigateur récent (Chrome/Edge/Brave/Arc).  
Pour un meilleur confort (et éviter des restrictions de fichiers), servez le dossier via un mini-serveur HTTP :

- avec Python :  
  ```bash
  cd site-web
  python3 -m http.server 8000
  ```  
  puis allez sur http://localhost:8000

- ou avec Node :  
  ```bash
  npx serve .
  ```

## Déploiement
Téléversez **tel quel** le contenu de ce dossier sur un hébergement statique (GitHub Pages, Netlify, Vercel, OVH…).

## Remarques
- L’ouverture / sauvegarde de JSON utilise l’API File System Access quand disponible, sinon une boîte de dialogue de téléchargement.
- Si vous souhaitez activer la source "clan" distante (Firebase), définissez `localStorage.firebaseConfig` avec votre configuration Firebase (console -> paramètres du projet).
