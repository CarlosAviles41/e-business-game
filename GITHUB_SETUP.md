# 🚀 GitHub Pages Setup - Step by Step

Your local git repository is ready! Follow these steps to deploy:

## Step 1: Create GitHub Repository

1. Go to https://github.com and sign in (or create an account if needed)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `e-business-game` (or any name you prefer)
4. Description: "Interactive E-Business Teacher Shopping Challenge Game"
5. Make sure it's set to **Public** (required for free GitHub Pages)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

## Step 2: Connect and Push Your Code

After creating the repository, GitHub will show you commands. Use these instead (already prepared):

**Copy and paste these commands in your terminal:**

```bash
cd /Users/carlosaviles/e-business-game
git remote add origin https://github.com/YOUR-USERNAME/e-business-game.git
git push -u origin main
```

**⚠️ IMPORTANT:** Replace `YOUR-USERNAME` with your actual GitHub username!

For example, if your username is `johnsmith`, the command would be:
```bash
git remote add origin https://github.com/johnsmith/e-business-game.git
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click the **"Settings"** tab (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **"Save"**
6. Wait 1-2 minutes for GitHub to deploy

## Step 4: Get Your Live Link

After GitHub Pages is enabled, your game will be available at:

**`https://YOUR-USERNAME.github.io/e-business-game/`**

Replace `YOUR-USERNAME` with your actual GitHub username.

You can find this link in the repository Settings → Pages section.

---

## ✅ Quick Checklist

- [ ] Created GitHub repository (Public)
- [ ] Added remote origin (replace YOUR-USERNAME)
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages in Settings
- [ ] Got your live link!

---

## 🆘 Troubleshooting

**If you get "repository not found" error:**
- Make sure you replaced `YOUR-USERNAME` with your actual GitHub username
- Verify the repository name matches exactly

**If Pages shows "not published yet":**
- Wait 2-3 minutes and refresh
- Make sure the repository is Public (not Private)

**Need to update your game later?**
```bash
cd /Users/carlosaviles/e-business-game
git add .
git commit -m "Update game"
git push
```
Changes will automatically update on your live site!

