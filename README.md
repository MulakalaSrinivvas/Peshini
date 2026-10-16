# Peshini's Mandarin Adventure · Animated Storybook

An interactive storybook for kids ages 3–6: watch the story, tap the Word Sheet (99 words with Mandarin speech), and play the review quiz.

Built with React + Vite + Tailwind. Builds to a single self-contained `dist/index.html` (via `vite-plugin-singlefile`), perfect for GitHub Pages.

## Deploy to GitHub Pages (automatic)

This repo ships with `.github/workflows/deploy.yml` — every push to `main` builds and deploys automatically.

### First-time setup (2 minutes)

1. **Create a repo on GitHub** (e.g. `peshini-mandarin-adventure`) and push this code:
   ```bash
   git init
   git add .
   git commit -m "Peshini's Mandarin Adventure"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. **Enable Pages with Actions:**
   - Open your repo → **Settings → Pages**
   - Under **Build and deployment → Source**, choose **GitHub Actions**
3. **Push again** (or use the **Actions** tab → **Run workflow**) to trigger the first deploy.

Your site will be live at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

### How it works

- Workflow runs `npx vite build --base=./` so asset paths are relative — works for both user sites (`*.github.io/`) and project sites (`*.github.io/repo/`).
- No `vite.config.ts` changes needed.
- `public/.nojekyll` is copied to `dist/.nojekyll` so Pages serves the files as-is.

### Local development

```bash
npm install
npm run dev
npm run build   # outputs dist/
npm run preview # preview the production build
```
