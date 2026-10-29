# Lingua — Smart Translation Web Tool

A responsive, beginner-friendly translation website made with plain HTML, CSS, and JavaScript. It is designed to be uploaded directly to GitHub and hosted with GitHub Pages.

## Features

- Translate text between a selection of popular languages
- Source and target language selectors
- Swap selected languages
- Character counter (up to 5,000 characters per request)
- Clear input, paste from clipboard, and copy translated output
- Keyboard shortcut: `Ctrl + Enter` (Windows/Linux) or `Cmd + Enter` (Mac) to translate
- Responsive layout for phones, tablets, and desktops
- No build tools, framework, or API key required

## Translation service

This project uses the public **MyMemory Translation API**. An internet connection is required. The service may impose usage limits, and translation quality or availability can vary. Do not send private or sensitive information through a public translation service.

## Run locally

1. Download and extract the ZIP.
2. Open `index.html` in a browser.
3. Enter text, choose languages, and click **Translate text**.

If browser clipboard features do not work when opening the file directly, use the paste/copy keyboard shortcuts or run the folder with a simple local web server.

## Upload to GitHub

1. Sign in to GitHub and create a new repository, for example `smart-translation-web-tool`.
2. Extract this ZIP on your computer.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root (not inside an extra nested folder).
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)` folder, then click **Save**.
7. Wait for GitHub Pages to publish the site. The published URL will appear in the Pages settings.

## Project structure

```text
smart-translation-web-tool/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Notes

- This is a front-end project; it does not require a server of your own.
- GitHub Pages can host this static website for free.
- The free translation endpoint is external, so this app cannot guarantee uptime or unlimited requests.
