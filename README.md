Vampire Tree Mascarade — GUIDE
=================================================

Ce document explique pas à pas comment utiliser l’application VTM Tree
pour gérer vos personnages par clan (Vampire: The Masquerade), soit
avec un fichier local (.json), soit avec Firestore (cloud).


──────────────────────────────────────────────────────────────────────
1) À QUOI SERT L’APPLI ?
──────────────────────────────────────────────────────────────────────
• Afficher un arbre généalogique de personnages, par CLAN.
• Lire et/ou modifier les fiches (si vous avez le droit d’écriture).
• Deux sources possibles :
  - MODE LOCAL (fichier .json sur votre ordinateur)
  - MODE CLOUD FIRESTORE (lecture publique, écriture si autorisée)
• Filtrer par LIGNÉE (quand un clan est sélectionné) pour ne voir que
  cette famille, avec l’ancêtre le plus ancien en racine.


──────────────────────────────────────────────────────────────────────
2) PRÉREQUIS
──────────────────────────────────────────────────────────────────────
• Vous avez reçu l’application prête à lancer.
• Si vous avez un setup, installer l'application via le setup.
• Internet est nécessaire uniquement pour le MODE FIRESTORE (cloud).
• Pour l’écriture sur le cloud : il faut un COMPTE autorisé (email/mot de passe).


──────────────────────────────────────────────────────────────────────
3) DÉMARRAGE RAPIDE
──────────────────────────────────────────────────────────────────────
1. Lancez l’application.
2. En haut à gauche, choisissez la SOURCE :
   • « — Source locale — » → travailler avec un fichier .json sur votre PC.
   • Un CLAN (ex. « malkavians ») → lire depuis Firestore (cloud).
3. Si vous voulez ÉCRIRE sur un clan Firestore :
   • Cliquez « Se connecter », entrez votre email/mot de passe (compte autorisé).
   • Le badge près du sélecteur affiche alors : « Écriture OK ».
   • S’il affiche « Lecture seule », vous n’avez pas les droits d’écriture.
4. Pour filtrer par LIGNÉE (uniquement en mode clan) :
   • Choisissez une lignée dans la liste « Lignée » → l’arbre se recalcule
     avec l’ancêtre le plus ancien en racine.
   • Pour revenir à tout le clan : choisir « — Lignée (toutes) — ».
5. Modifiez ce que vous voulez, puis cliquez « Sauvegarder ».
   • Un petit message (toast) confirme la progression et le succès. ATTENTION SEULEMENT SAUVEGARDER EN BLEU PERMET D'APPLIQUER LES CHANGEMENTS A LA BASE
     DE DONNEE. Enregister dans editer/ajouter sauvegarde pour la session actuelle.
ATTENTION : SAUVEGARDER prend jusqu'à 1 min pour mettre à jour le cloud attendez le message en bas à droite.


──────────────────────────────────────────────────────────────────────
4) MODE LOCAL (FICHIER .JSON)
──────────────────────────────────────────────────────────────────────
• Ouvrir un JSON : bouton « Ouvrir JSON » → sélectionnez votre fichier.
  Le fichier doit contenir un TABLEAU d’objets (ex. [ {…}, {…} ]).
• Modifier : utilisez « Ajouter un personnage », « Éditer », « Supprimer ».
• Sauvegarder : bouton « Sauvegarder ».
  - Si le fichier est réécrivable, l’appli l’écrit directement.
  - Sinon, utilisez « Exporter JSON » pour créer une copie.
• Astuce : gardez toujours une copie de sécurité de vos fichiers locaux.


──────────────────────────────────────────────────────────────────────
5) MODE CLOUD FIRESTORE (PAR CLAN)
──────────────────────────────────────────────────────────────────────
• Sélectionnez un CLAN dans le menu (ex. « malkavians »).
  → L’appli charge le contenu du clan (lecture publique).
• Pour ÉCRIRE : connectez-vous (email/mot de passe) avec un compte autorisé (voir avec l'admin)
  → Le badge indique « Écriture OK » si tout est bon.
• Si le badge indique « Lecture seule » :
  - Vous pouvez lire, mais les boutons « Ajouter / Éditer / Supprimer »
    seront grisés/désactivés.
  - Demandez à l’administrateur d’ajouter votre UID au clan si besoin.
• Sauvegarder : bouton « Sauvegarder ». Un toast (notification en bas à gauche) indique le résultat.


──────────────────────────────────────────────────────────────────────
6) LIGNÉE (FILTRE SPÉCIAL PAR CLAN)
──────────────────────────────────────────────────────────────────────
• La liste « Lignée » apparaît uniquement quand un CLAN Firestore est choisi.
• Choisissez une lignée → l’arbre affiche uniquement cette lignée :
  - Racine : l’ancêtre le plus ancien de la lignée (génération minimale
    ou ancêtre sans « sire » dans la même lignée).
  - Enfants : uniquement ceux de la même lignée.
  - « Isolés » : la liste en bas est filtrée pareil.
• Pour revenir à la vue du clan complet : « — Lignée (toutes) — ».


──────────────────────────────────────────────────────────────────────
7) ÉDITER / AJOUTER UN PERSONNAGE
──────────────────────────────────────────────────────────────────────
• L’éditeur de fiche ouvre une fenêtre avec des champs.
• Les menus déroulants (ex. « Activité ») :
  - Si un menu est vide : fermez/rouvrez l’éditeur ou relancez l’app.
• Conseils de saisie :
  - « id » : identifiant unique automatique. Nom du personnage en minuscule
  - « sire » : identifiant du parent (pour la généalogie). Vous pouvez choisir le sire
  - « generation » : plus le nombre est PETIT, plus l’ancêtre est ancien.
  - « lignee » : le nom exact de la lignée (permet le filtre lignée).
  - « infant » : les infants, ctrl + clic pour sélectionner, ils apparaissent en bruit.

• Cliquez « Enregistrer » pour valider, ou « Annuler » pour quitter.


──────────────────────────────────────────────────────────────────────
8) IMPORTER UNE GROSSE BASE (OUTIL SÉPARÉ, FACULTATIF) (SEULEMENT EXPERIMENTE)
──────────────────────────────────────────────────────────────────────
• Fichier : « seed_multi_clans.html » (page d’import).
• Usage :
  1) Ouvrez la page dans votre navigateur.
  2) Collez la « firebaseConfig » de votre projet (fourni par l’admin).
  3) Connectez-vous (email/mot de passe autorisé).
  4) Choisissez le CLAN et le fichier JSON (tableau d’objets).
  5) Option « update-only » : si cochée, on NE SUPPRIME RIEN côté serveur.
  6) Cliquez « Importer » et suivez le journal.
• À utiliser pour de gros chargements (initialisation/migration).


──────────────────────────────────────────────────────────────────────
9) SAUVEGARDE : CE QU’IL FAUT SAVOIR
──────────────────────────────────────────────────────────────────────
• Un petit message en bas à droite (toast) confirme la sauvegarde (succès/erreurs).
• En mode cloud, l’appli enregistre document par document.
• Si l’import « update-only » est activé (dans l’outil d’import), rien
  n’est supprimé côté serveur (seules créations/mises à jour).


──────────────────────────────────────────────────────────────────────
10) DÉPANNAGE (FAQ SIMPLE)
──────────────────────────────────────────────────────────────────────
• Je lag sur la map :
  → désactiver le survol
• Je n’arrive pas à me connecter :
  → Vérifiez email/mot de passe et votre connexion internet.
• Je suis connecté mais le badge reste « Lecture seule » :
  → Votre compte n’a pas les droits d’écriture pour ce clan.
     Demandez à l’administrateur.
• Je clique « Sauvegarder » mais rien ne change :
  → En mode cloud : assurez-vous que le badge indique « Écriture OK ».
  → En mode local : vérifiez que le fichier n’est pas protégé en écriture,
    ou utilisez « Exporter JSON » pour créer une nouvelle copie.
• Les menus déroulants (Activité, etc.) sont vides :
  → Fermez la fenêtre d’édition et réessayez, ou relancez l’application.
• La lignée ne filtre rien :
  → Assurez-vous d’avoir d’abord choisi un CLAN (mode cloud).
    Puis sélectionnez la lignée EXACTE (l’appli gère les espaces/casse).
• Page blanche / erreurs réseau :
  → Relancez l’application. Si le problème persiste, contactez l’admin.


──────────────────────────────────────────────────────────────────────
11) GLOSSAIRE
──────────────────────────────────────────────────────────────────────
• CLAN : groupe (ex. malkavians, brujah…).
• LIGNÉE : sous‑famille à l’intérieur d’un clan (filiation).
• SIRE : parent d’un vampire (l’ancêtre direct).
• GÉNÉRATION : plus petit = plus ancien/puissant (ex. Gen 5 est plus ancien que Gen 9).
• JSON : format de fichier texte pour stocker des données (liste d’objets).
• FIRESTORE : base de données cloud de Google (lecture/écriture).
• UID : identifiant unique d’un compte utilisateur sur Firebase Auth.
• « Écriture OK » : votre compte peut modifier les données du clan.
• « Lecture seule » : vous pouvez lire mais pas modifier (boutons grisés).
• TOAST : petit message qui apparaît en bas, sans bloquer l’écran.


──────────────────────────────────────────────────────────────────────
12) CHECKLIST AVANT DE MODIFIER BEAUCOUP DE DONNÉES
──────────────────────────────────────────────────────────────────────
[ ] Je sais si je travaille en LOCAL ou sur le CLOUD.
[ ] Si CLOUD, je suis bien connecté et j’ai « Écriture OK ».
[ ] J’ai une **copie de sauvegarde** (fichier local ou backup Firestore).
[ ] Je connais le **clan**que je veux afficher/éditer.
[ ] Après modification, j’ai cliqué « Sauvegarder » et vu le toast « Enregistré ».


Bon usage, et n’hésitez pas à demander de l’aide si un point n’est pas clair !
Enjoy,
Swiiptz :D.
