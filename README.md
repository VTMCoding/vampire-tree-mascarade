# 🦇 Vampire Tree Mascarade — GUIDE
**Application VTM Tree**  
Gérez vos personnages *Vampire: The Masquerade* par clan, en local ou via Firestore (cloud).

---

## 1️⃣ À QUOI SERT L’APPLI ?

- Afficher un **arbre généalogique de personnages** par **CLAN**.  
- Lire et/ou modifier les fiches (si vous avez le droit d’écriture).  
- Deux sources possibles :
  - **MODE LOCAL** → fichier `.json` sur votre ordinateur  
  - **MODE CLOUD FIRESTORE** → lecture publique, écriture si autorisée  
- **Filtrer par LIGNÉE** (quand un clan est sélectionné) pour ne voir que cette famille, avec l’ancêtre le plus ancien en racine.

---

## 2️⃣ PRÉREQUIS

- Vous avez reçu l’application prête à lancer.  
- Si vous avez un setup, installez l'application via le setup.  
- **Internet** est nécessaire uniquement pour le **MODE FIRESTORE (cloud)**.  
- Pour l’écriture sur le cloud : il faut un **COMPTE autorisé (email/mot de passe)**.

---

## 3️⃣ DÉMARRAGE RAPIDE

1. Lancez l’application.  
2. En haut à gauche, choisissez la **SOURCE** :
   - `— Source locale —` → travailler avec un fichier `.json` sur votre PC  
   - Un **CLAN** (ex. `malkavians`) → lire depuis Firestore (cloud)
3. Pour **ÉCRIRE** sur un clan Firestore :
   - Cliquez `Se connecter`, entrez votre email/mot de passe (compte autorisé).  
   - Le badge près du sélecteur affiche alors : **Écriture OK**.  
   - S’il affiche **Lecture seule**, vous n’avez pas les droits d’écriture.
4. Pour **filtrer par LIGNÉE** (uniquement en mode clan) :
   - Choisissez une lignée dans la liste `Lignée` → l’arbre se recalcule.  
   - Pour revenir à tout le clan : choisir `— Lignée (toutes) —`.
5. Modifiez ce que vous voulez, puis cliquez **Sauvegarder**.
   - ⚠️ **ATTENTION** : seul le bouton **Sauvegarder (bleu)** applique les changements à la base Firestore.  
   - Enregistrer dans *Éditer/Ajouter* ne sauvegarde que pour la session actuelle.  
   - **La sauvegarde peut prendre jusqu’à 1 minute** — attendez le message en bas à droite.

---

## 4️⃣ MODE LOCAL (FICHIER .JSON)

- **Ouvrir un JSON** : bouton `Ouvrir JSON` → sélectionnez votre fichier.  
  Le fichier doit contenir un **tableau d’objets** (ex. `[ {…}, {…} ]`).  
- **Modifier** : utilisez `Ajouter un personnage`, `Éditer`, `Supprimer`.  
- **Sauvegarder** : bouton `Sauvegarder`.
  - Si le fichier est réécrivable, l’appli l’écrit directement.
  - Sinon, utilisez `Exporter JSON` pour créer une copie.
- 💡 **Astuce** : gardez toujours une **copie de sécurité** de vos fichiers locaux.

---

## 5️⃣ MODE CLOUD FIRESTORE (PAR CLAN)

- Sélectionnez un **CLAN** dans le menu (ex. `malkavians`).  
  → L’appli charge le contenu du clan (**lecture publique**).  
- Pour **ÉCRIRE** :
  - Connectez-vous (email/mot de passe autorisé).  
  - Le badge indique **Écriture OK** si tout est bon.  
- Si le badge indique **Lecture seule** :
  - Vous pouvez lire, mais les boutons `Ajouter / Éditer / Supprimer` seront désactivés.  
  - Demandez à l’administrateur d’ajouter votre **UID** au clan si besoin.  
- **Sauvegarder** : bouton `Sauvegarder`.  
  → Une notification (toast) en bas à gauche confirme le résultat.

---

## 6️⃣ LIGNÉE (FILTRE SPÉCIAL PAR CLAN)

- La liste `Lignée` apparaît uniquement quand un **CLAN Firestore** est choisi.  
- Choisissez une lignée → l’arbre affiche uniquement cette lignée :
  - **Racine** : l’ancêtre le plus ancien (génération minimale ou sans sire).  
  - **Enfants** : uniquement ceux de la même lignée.  
  - **Isolés** : la liste en bas est filtrée pareil.  
- Pour revenir à la vue du clan complet : `— Lignée (toutes) —`.

---

## 7️⃣ ÉDITER / AJOUTER UN PERSONNAGE

- L’éditeur de fiche ouvre une fenêtre avec des champs.  
- Les menus déroulants (ex. `Activité`) :
  - Si un menu est vide : fermez/rouvrez l’éditeur ou relancez l’app.
- **Conseils de saisie** :
  - `id` : identifiant unique automatique → nom du personnage en minuscule  
  - `sire` : identifiant du parent (pour la généalogie)  
  - `generation` : plus le nombre est **petit**, plus l’ancêtre est ancien  
  - `lignee` : le nom exact de la lignée (pour le filtre lignée)  
  - `infant` : enfants (Ctrl + clic pour sélectionner)
- Cliquez **Enregistrer** pour valider, ou **Annuler** pour quitter.

---

## 8️⃣ IMPORTER UNE GROSSE BASE *(outil séparé, optionnel — expérimenté uniquement)*

- Fichier : `seed_multi_clans.html`  
- **Usage :**
  1. Ouvrez la page dans votre navigateur.  
  2. Collez la `firebaseConfig` de votre projet (fournie par l’admin).  
  3. Connectez-vous (email/mot de passe autorisé).  
  4. Choisissez le **CLAN** et le fichier JSON.  
  5. Option `update-only` : si cochée → **aucune suppression** côté serveur.  
  6. Cliquez `Importer` et suivez le journal.
- À utiliser pour de gros chargements (**initialisation/migration**).

---

## 9️⃣ SAUVEGARDE — À SAVOIR

- Un petit message (toast) confirme la sauvegarde (succès/erreurs).  
- En mode cloud, l’appli enregistre **document par document**.  
- Si l’import `update-only` est activé → aucune suppression sur Firestore.

---

## 🔟 DÉPANNAGE (FAQ SIMPLE)

| Problème | Solution |
|-----------|-----------|
| Je lag sur la map | Désactiver le survol |
| Je n’arrive pas à me connecter | Vérifiez email/mot de passe et votre connexion internet |
| Je suis connecté mais le badge reste « Lecture seule » | Votre compte n’a pas les droits d’écriture — contactez l’admin |
| Je clique « Sauvegarder » mais rien ne change | Vérifiez que vous êtes en mode cloud avec **Écriture OK**, ou que le fichier local est modifiable |
| Menus déroulants vides | Fermez/relancez l’app |
| La lignée ne filtre rien | Vérifiez que vous avez choisi un **CLAN (cloud)** et la **lignée exacte** |
| Page blanche / erreur réseau | Relancez l’application ou contactez l’admin |

---

## 11️⃣ GLOSSAIRE

| Terme | Définition |
|-------|-------------|
| **CLAN** | Groupe (ex. *malkavians*, *brujah*…) |
| **LIGNÉE** | Sous-famille à l’intérieur d’un clan |
| **SIRE** | Parent d’un vampire (l’ancêtre direct) |
| **GÉNÉRATION** | Plus petit = plus ancien / puissant |
| **JSON** | Format de fichier texte (liste d’objets) |
| **FIRESTORE** | Base de données cloud Google |
| **UID** | Identifiant unique Firebase Auth |
| **Écriture OK** | Compte avec droit d’édition |
| **Lecture seule** | Lecture uniquement (pas d’écriture) |
| **TOAST** | Message non bloquant affiché en bas |

---

## 12️⃣ CHECKLIST AVANT DE MODIFIER BEAUCOUP DE DONNÉES

- [ ] Je sais si je travaille en **LOCAL** ou sur le **CLOUD**  
- [ ] Si CLOUD, je suis bien connecté et j’ai **Écriture OK**  
- [ ] J’ai une **copie de sauvegarde** (fichier local ou backup Firestore)  
- [ ] Je connais le **clan** que je veux afficher/éditer  
- [ ] Après modification, j’ai cliqué **Sauvegarder** et vu le toast **Enregistré**

---

### 🩸 Bon usage, et n’hésitez pas à demander de l’aide si un point n’est pas clair !  
**Enjoy,**  
👤 *Swiiptz* 😈
