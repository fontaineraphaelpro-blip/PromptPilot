# Extension Chrome PromptPilot

1. Ouvrir `chrome://extensions`
2. Activer **Mode développeur**
3. **Charger l'extension non empaquetée** → sélectionner ce dossier `extension/`

Le bouton flottant apparaît sur ChatGPT et Claude. Il ouvre `/improve` avec le texte du champ de saisie.

Pour changer l'URL de prod, modifier `APP_ORIGIN` dans `content.js` et `ORIGIN` dans `popup.js`.
