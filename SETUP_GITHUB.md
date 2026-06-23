# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `zmk-config-charybdis-beacons` (or any name you prefer)
3. Description: "ZMK firmware for Charybdis with coach beacon macros"
4. Visibility: **Public** (required for free GitHub Actions minutes)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these instead:

```bash
cd zmk-config-charybdis-beacons
git remote add origin https://github.com/YOUR_USERNAME/zmk-config-charybdis-beacons.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Monitor the Build

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. You should see a workflow running called "Build ZMK Firmware"
4. Click on it to watch the build progress
5. The build takes about 15-20 minutes

## Step 4: Download Firmware

Once the build completes (green checkmark):

1. Click on the completed workflow run
2. Scroll to the "Artifacts" section at the bottom
3. Download all three artifacts:
   - `nice_nano_v2-charybdis_left`
   - `nice_nano_v2-charybdis_right`
   - `nice_nano_v2-settings_reset`
4. Each download is a ZIP file containing a .uf2 file

## Step 5: Flash Firmware

1. Extract all three UF2 files from the ZIP archives
2. **IMPORTANT**: Flash settings_reset.uf2 to BOTH keyboard halves first
3. Flash charybdis_left.uf2 to the left half
4. Flash charybdis_right.uf2 to the right half
5. Pair both halves to your computer via Bluetooth

---

## Alternative: Use GitHub CLI

If you have `gh` installed:

```bash
cd zmk-config-charybdis-beacons
gh repo create zmk-config-charybdis-beacons --public --source=. --remote=origin
git push -u origin main
gh workflow view
```

---

## Repository is Ready!

The repository is already committed and ready to push. All files are staged at:
`C:\Users\sondr\splitted_zmk_keyboard\zmk-config-charybdis-beacons`

Just follow steps 1-2 above to get it on GitHub and building!
