# HerHealth Guide 💜

A free, private, personalised women's health website — from childhood to old age.
Covers personal hygiene, menstrual health, nutrition & supplements, and safety/helpline resources.
Content adapts based on the user's age group, ethnicity, and dietary practice.

---

## What's in this project

```
my-personal-project/
├── index.html   ← Main page (open this in your browser)
├── style.css    ← All styling
├── data.js      ← All health content and data
└── app.js       ← Application logic
```

No frameworks. No dependencies. No internet connection required.

---

## Option 1 — Open directly in your browser (quickest)

1. Open **Finder**
2. Navigate to your project folder (`my-personal-project`)
3. Double-click `index.html`

It will open in your default browser and work immediately.

> **Note:** This method works perfectly for this project because it uses no server-side code.

---

## Option 2 — Run a local development server (recommended)

Running via a local server avoids any browser security restrictions and is the best practice for web development.

### Using Python (built into macOS — no install needed)

Open **Terminal** and run:

```bash
cd /Users/oasys/my-personal-project
python3 -m http.server 8080
```

Then open your browser and go to:

```
http://localhost:8080
```

To stop the server, press `Ctrl + C` in Terminal.

---

### Using Node.js (if you have it installed)

If you have Node.js installed, you can use `npx` to run a server with no install step:

```bash
cd /Users/oasys/my-personal-project
npx serve .
```

Then open your browser and go to:

```
http://localhost:3000
```

To stop the server, press `Ctrl + C` in Terminal.

> **Check if Node is installed:** Run `node -v` in Terminal. If you see a version number (e.g. `v20.0.0`), you have it.

---

### Using VS Code Live Server (if you use VS Code)

1. Open VS Code
2. Install the **Live Server** extension (search for it in the Extensions panel, `Cmd + Shift + X`)
3. Open the `my-personal-project` folder in VS Code (`File → Open Folder`)
4. Right-click `index.html` in the file explorer
5. Select **"Open with Live Server"**

Your browser will open automatically at `http://127.0.0.1:5500`.
The page will also **auto-refresh** whenever you save a file — great for making edits.

---

## How to use the website

1. Open the site using any method above
2. Optionally enter your name
3. Select your **age group** (click one of the buttons)
4. Select your **background / ethnicity** from the dropdown
5. Select your **dietary practice** from the dropdown
6. Click **"Get My Personalised Guide →"**
7. Browse the four tabs:
   - 🧼 **Hygiene** — age-appropriate personal hygiene tips
   - 🩸 **Menstrual Health** — cycle, puberty, perimenopause, and more
   - 🥗 **Nutrition** — key nutrients, supplements, and food guidance personalised by ethnicity and diet
   - 🛡️ **Safety & Support** — domestic violence hotlines, free legal aid, mental health resources
8. Click **"← Change preferences"** at any time to update your selections

---

## Making changes

| What you want to edit | File to open |
|---|---|
| Health content, hotline numbers, nutrition data | `data.js` |
| Page layout and structure | `index.html` |
| Colours, fonts, spacing | `style.css` |
| Tab switching, form logic, rendering | `app.js` |

All files are plain text — open them in any text editor (TextEdit, VS Code, Sublime Text, etc.).

---

## Browser compatibility

Works in all modern browsers:

- Safari (macOS / iOS)
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

No installation, no account, no data is collected or sent anywhere.

---

## Important note

> This website provides **general health education only** and is not a substitute for professional medical advice.
> Always consult a qualified healthcare professional for personal medical decisions.
> If you or someone you know is in immediate danger, call **911** (or your local emergency number).
