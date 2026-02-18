# 🎹 Nap Musique

Nap Musique est une application web d’apprentissage du piano, en français, avec une interface immersive (animations, thèmes clair/sombre) et plusieurs modes de pratique.

## ✨ Fonctionnalités

- Apprentissage progressif par niveaux
- Morceaux et exercices de piano intégrés
- Mode **Piano Libre**
- Feedback immédiat pendant le jeu
- Suivi de progression (stocké localement)
- Personnalisation du style de piano
- Décalage d’octave configurable (`-3` à `+3`)
- Thème clair / sombre

## 🗂️ Structure du projet

- `INDEX.HTML` : structure de l’interface utilisateur
- `p.css` : styles, animations et thèmes
- `don.js` : logique applicative (audio, gameplay, données des morceaux)

## ▶️ Lancer le projet

### Option 1 (simple)

1. Ouvrir le dossier du projet.
2. Double-cliquer sur `INDEX.HTML`.

### Option 2 (recommandée)

Utiliser un serveur local (Live Server dans VS Code par exemple), puis ouvrir la page dans le navigateur.

## 🔊 Prérequis

- Un navigateur moderne (Chrome, Edge, Firefox)
- Audio activé dans le navigateur

## 💾 Données utilisateur

Les préférences et la progression sont enregistrées dans le `localStorage` du navigateur.

## 🛠️ Personnalisation rapide

- Modifier les couleurs et effets dans `p.css`
- Ajouter/éditer des morceaux dans `don.js` (objet `songsData`)
- Ajuster la structure des pages dans `INDEX.HTML`

## 📌 Remarques

- Le projet est 100% front-end (pas de back-end requis).
- Certains navigateurs demandent une interaction utilisateur avant de démarrer l’audio.

---

Développé pour apprendre le piano de manière ludique et visuelle. 🎵
