# 🔐 How to Push to GitHub

## Method 1: Personal Access Token (Easiest)

1. **Create a token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: "E-Business Game"
   - Check the **"repo"** scope
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Push your code:**
   ```bash
   cd /Users/carlosaviles/e-business-game
   git push -u origin main
   ```
   
   When it asks for:
   - **Username:** `CarlosAviles41`
   - **Password:** Paste your token (not your GitHub password!)

---

## Method 2: Use GitHub Desktop (Visual)

1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select: `/Users/carlosaviles/e-business-game`
5. Click "Publish repository"
6. Done! Then enable GitHub Pages in browser

---

## Method 3: Switch to SSH (More Secure)

If you want to avoid entering credentials each time:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter 3 times (use default location, no passphrase)

# Copy your public key
cat ~/.ssh/id_ed25519.pub

# Add it to GitHub:
# 1. Go to https://github.com/settings/keys
# 2. Click "New SSH key"
# 3. Paste the key you copied
# 4. Save

# Then switch remote to SSH
cd /Users/carlosaviles/e-business-game
git remote set-url origin git@github.com:CarlosAviles41/e-business-game.git
git push -u origin main
```

---

## After Pushing: Enable GitHub Pages

1. Go to: https://github.com/CarlosAviles41/e-business-game
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes
7. Your game will be at: **https://carlosaviles41.github.io/e-business-game/**

