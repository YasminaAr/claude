# Claude PR Review (GitHub Actions + IA)

## Objectif

À chaque Pull Request sur GitHub :

| Étape | Description |
|-------|-------------|
| GitHub Actions démarre | Le workflow `review.yml` s'exécute automatiquement |
| Lecture du code | `index.js` est lu et injecté dans le prompt |
| Analyse IA | Claude détecte les mauvaises pratiques |
| Commentaire automatique | Le résultat est posté directement dans la PR |

---

## Structure du projet

```
claude-pr-review/
├── index.js                        # Code JavaScript à analyser (volontairement imparfait)
├── prompt.txt                      # Prompt envoyé à Claude
├── README.md
└── .github/
    └── workflows/
        └── review.yml              # Workflow GitHub Actions
```

---

## Prérequis

- Compte GitHub
- Clé API Anthropic (Claude)
- Git

---

## Configuration

### 1. Cloner le projet

```bash
git clone https://github.com/YasminaAr/claude.git
cd claude
```

### 2. Ajouter la clé API

Dans GitHub : **Settings → Secrets and variables → Actions → New repository secret**

```
Name:  CLAUDE_API_KEY
Value: ta_cle_api_claude
```

---

## Le code à analyser — `index.js`

Volontairement imparfait pour la démo :

```js
function add(a, b) {
    console.log("debug"); // ❌ mauvaise pratique
    return a + b;
}

function divide(a, b) {
    return a / b; // ⚠ pas de vérification division par 0
}

module.exports = { add, divide };
```

---

## Le prompt — `prompt.txt`

```
Tu es un expert en développement JavaScript.

Analyse ce code :
{{CODE}}

Instructions :
- Détecte les mauvaises pratiques
- Vérifie les erreurs potentielles
- Donne des suggestions d'amélioration

Réponds en français avec ce format :

🔍 Analyse :
...

⚠ Problèmes :
...

💡 Suggestions :
...

✅ Verdict :
OK ou À corriger
```

---

## Comment tester (pas à pas)

### Étape 1 — Créer une branche

```bash
git checkout -b test-ai
```

### Étape 2 — Modifier `index.js`

Ajouter une ligne pour déclencher l'analyse :

```js
function add(a, b) {
    console.log("debug");
    console.log("test"); // 👈 ajout
    return a + b;
}
```

### Étape 3 — Push

```bash
git add .
git commit -m "test claude"
git push origin test-ai
```

### Étape 4 — Créer une Pull Request

Sur GitHub, cliquer sur **Compare & pull request** :

- **base** : `main`
- **compare** : `test-ai`
- Titre : `Test Claude AI Review`
- Cliquer sur **Create pull request**

---

## Ce qui se passe automatiquement

```
Pull Request ouverte
        ↓
GitHub Actions déclenche review.yml
        ↓
index.js est lu et injecté dans le prompt
        ↓
Claude analyse le code via l'API Anthropic
        ↓
💬 Commentaire posté automatiquement dans la PR
```

---

## Résultat attendu

```
🔍 Analyse :
Le code contient deux fonctions utilitaires simples.

⚠ Problèmes :
- console.log("debug") : log de débogage laissé en production
- divide(a, b) : aucune vérification si b === 0 (risque de NaN/Infinity)

💡 Suggestions :
- Supprimer les console.log de débogage
- Ajouter : if (b === 0) throw new Error('Division par zéro')

✅ Verdict :
À corriger
```

---

## Où voir le résultat

| Onglet | Ce qu'on voit |
|--------|---------------|
| **Actions** | Logs du workflow, succès ou échec |
| **Pull Requests** | Commentaire automatique de Claude |

---

## Problèmes fréquents

| Erreur | Solution |
|--------|----------|
| Rien ne se passe | Vérifier que `review.yml` est dans `.github/workflows/` |
| Erreur API | Vérifier que `CLAUDE_API_KEY` est bien dans les Secrets |
| Workflow failed | Aller dans **Actions → logs** pour voir le détail |

---

## Ce que ce projet démontre

- CI/CD intelligent avec IA
- Analyse automatique du code à chaque PR
- Intégration de Claude dans un pipeline DevOps
- Gain de temps en code review

---

## Comparaison Avant / Après

| Revue manuelle | Claude PR Review |
|----------------|-----------------|
| Lente, dépend du reviewer | Instantanée, cohérente |
| Peut rater des bugs | Détection systématique |
| Coûteuse en temps | Entièrement automatique |

---

## Upgrades possibles

- Bloquer le merge si Claude détecte des erreurs critiques
- Ajouter un score qualité (0–100)
- Analyser plusieurs fichiers à la fois
- Corriger automatiquement le code

---

## Technologies

- GitHub Actions
- Claude API (Anthropic)
- Node.js / Bash / `jq` / `curl`
