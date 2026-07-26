# Our Love App

A private, password-locked app for the two of you: daily letters (she can write back), a memory timeline with real photo uploads, reasons you love her, countdowns, and a shared bucket list.

## What changed from the single-file version

- **Real backend** (Node + Express) instead of browser-only storage. Data lives in `data/db.json` on your computer, and photos are actually saved as files in `public/images/`.
- **Multiple pages** instead of tabs: `index.html`, `letters.html`, `memories.html`, `reasons.html`, `countdown.html`, `bucket.html`, `lock.html` — each a real page, all sharing `public/css/style.css` and `public/js/app.js`.
- **Photo uploads from your phone or laptop** — tap "Add a photo," pick from your camera roll or files, it uploads to the server and saves permanently. No more pasting URLs.
- **Two-way letters** — when she opens today's letter, there's a reply box right under it. Her reply gets saved and shows up threaded under that letter in "Our letter history," like a real back-and-forth.
- **Animations** — the envelope now has a paper peeking out as it opens, letters type themselves out like they're being written live, hearts float gently in the background on every page, buttons burst into little hearts when you save something or check off a bucket list item, and pages fade/slide in as you navigate.

## Setup (one time)

You'll need [Node.js](https://nodejs.org) installed (the LTS version). Then, in a terminal, inside this folder:

```bash
npm install
npm start
```

You'll see:

```
Our love app is running.
On this computer:  http://localhost:3000
```

Open that link in your browser. The first time, it'll walk you through setup: your name, her name, your anniversary, and a secret word (the password).

## Using it on your phone

Since this runs on your computer, your phone needs to reach it over the same WiFi network:

1. Make sure your phone and computer are on the **same WiFi**.
2. Find your computer's local IP address:
   - **Mac**: System Settings → Wi-Fi → Details (or run `ipconfig getifaddr en0` in Terminal)
   - **Windows**: run `ipconfig` in Command Prompt, look for "IPv4 Address"
   - **Linux**: run `hostname -I`
3. On your phone's browser, go to `http://YOUR_IP:3000` — for example `http://192.168.1.42:3000`.
4. Log in with your secret word. That's it — you can now add letters, memories, and photos straight from your phone, using your camera.

**Heads up:** this only works while your computer is on, the server is running (`npm start`), and both devices are on the same WiFi. If you want her to be able to open it anytime from anywhere — not just when your laptop is on and you're both home — you'd need to deploy it to a real host (like Render or Railway). Ask me if you want help with that next; it's a bigger step since photo storage needs a proper cloud setup at that point.

## Editing content

Tap the pencil icon (top right, next to the lock) to turn on edit mode. That reveals all the "add new" forms and delete buttons across every page. Turn it off before handing your phone to her, and she'll only see the clean, read-only experience (plus the reply box on letters, which always works).

## Project structure

```
love-app/
  server.js              the backend: auth, data storage, photo uploads
  data/db.json            your saved data (created automatically)
  public/
    lock.html             setup + login screen
    index.html             home
    letters.html            envelope, today's letter, reply thread, history
    memories.html            photo timeline
    reasons.html             reasons I love you
    countdown.html           special date countdowns
    bucket.html               shared bucket list
    css/style.css           all the styling and animations
    js/app.js                 shared logic (auth, nav, animations, API calls)
    images/                    uploaded photos land here
```

## Customizing it further

Everything's plain HTML/CSS/JS and a small Express server — nothing to compile. Open any file in VS Code and edit directly:
- Colors and fonts: top of `public/css/style.css` under `:root`
- Wording on any page: directly in that page's `.html` file
- Add a new page: copy an existing one, add a nav item in `NAV_ITEMS` inside `public/js/app.js`
