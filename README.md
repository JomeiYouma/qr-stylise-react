# QR Stylisé — React

Générateur de QR codes stylisés avec une UI claire, presets, dégradés, drag & drop du logo et exports PNG / SVG / JPG. **100 % côté navigateur.**

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173.

## Build & déploiement GitHub Pages

```bash
npm run build
```

Le dossier `dist/` est prêt. Pour un push automatique sur la branche `gh-pages` :

```bash
npm run deploy
```

(installe et utilise `gh-pages` via `npx`.)

Si tu déploies à la racine du dépôt, l'option `base: './'` de `vite.config.js` rend tout fonctionnel sans changer la config selon le sous-chemin.

### Étapes complètes

1. Créer un dépôt GitHub (ex: `qr-stylise`).
2. `git init && git add . && git commit -m "init"` puis `git branch -M main`
3. `git remote add origin https://github.com/<user>/qr-stylise.git && git push -u origin main`
4. `npm run deploy`
5. **Settings → Pages** : source = branche `gh-pages`.

## Stack

- React 18 + Vite
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- CSS vanilla, design glass/aurora maison
