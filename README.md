# COMP 381 Final Project - Browser ML Playground

Interactive machine learning playground built with React, DanfoJs and Scikit Learn JS where data loading, feature engineering, train/test split, model training, and inference run fully in the browser.

View Live site: https://mrishab.github.io/COMP381_FinalProject/

## What this project does

- Loads bundled CSV datasets from the public folder.
- Lets you inspect tables and basic dataset statistics.
- Supports feature selection and feature transformations (regular, polynomial, interaction terms).
- Builds train/test splits directly in client-side.
- Trains models in-browser using scikitjs with TensorFlow.js backend.
- Shows prediction and evaluation metrics for browser-executed models.

## Architecture (no backend)

This is a static frontend application:

- No server-side API calls for ML execution.
- No database.
- No backend training job queue.
- Data + model operations happen in the browser tab (client runtime).

Implications:

- Training/inference speed depends on the user's device and browser.
- Closing or refreshing the tab clears in-memory state unless persisted by the app.
- Best experience is with small-to-medium datasets and moderate feature counts.

## Tech stack

- React 19 + TypeScript
- Vite 6 - build tool
- Tailwind CSS - styling
- Zustand state management
- Danfo.js for dataframe-like operations (Pandas alternative)
- scikitjs + TensorFlow.js for in-browser ML
- Plotly for visualization (Matplotlib alternative)
- GitHub Pages for deployment

## Prerequisites

- macOS, Linux, or Windows with a Unix-like shell
- Git
- Node.js 20.17.0 (required)
- npm (ships with Node)
- Optional but recommended:
  - nvm (Node version manager)
  - direnv (auto-load project shell environment)

Node version policy (from package engines):

- > = 20.17.0 and < 21

## Local setup

### 1. Clone and enter project

```bash
git clone https://github.com/mrishab/COMP381_FinalProject.git
cd COMP381_FinalProject
```

### 2. Use the correct Node version with nvm

This repo includes .nvmrc with Node 20.17.0.

```bash
nvm install
nvm use
node -v
```

If nvm is not installed yet (macOS, Homebrew):

```bash
brew install nvm
mkdir -p ~/.nvm
```

Then follow the nvm shell-init instructions shown by Homebrew.

### 3. Enable direnv (optional but recommended)

This repo includes .envrc that loads nvm and runs nvm use automatically.

Install direnv (macOS):

```bash
brew install direnv
```

Hook direnv into your shell (one-time), then from the repo root:

```bash
direnv allow
```

After this, entering the project directory auto-selects the correct Node version.

### 4. Install dependencies

```bash
npm install
```

## Run locally

Start dev server:

```bash
npm run dev
```

Default local URL:

- http://localhost:3000

Hot Module Replacement (HMR) is enabled, so UI/code changes appear live in the browser while developing.

## Quality checks

Lint + format check:

```bash
npm run check
```

Auto-fix lint + formatting:

```bash
npm run fix
```

## Production build and local preview

Create optimized build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## GitHub Pages deployment and live updates

Deployment is automated via GitHub Actions workflow on pushes to main.

How to publish changes:

1. Commit your changes.
2. Push to main.
3. GitHub Actions builds and deploys dist to GitHub Pages.
4. Refresh the live URL after workflow completes.

Notes:

- Vite base path is configured for GitHub Pages project hosting (/COMP381_FinalProject/).
- First load after deploy may be cached; hard refresh if you do not see updates immediately.

## Troubleshooting

Dependencies fail to install:

- Remove node_modules and package-lock.json, then rerun npm install.

App loads but routes/assets break on Pages:

- Ensure deployment is built from this repo config with the existing Vite base path.
