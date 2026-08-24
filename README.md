# Emil Kriukov — GitHub Pages portfolio

A dependency-free static research portfolio designed for GitHub Pages. The current version centers Eye1k as the North Star project, includes ongoing projects, a paper-linked career timeline, a teaching section, hobby science projects, a profile photo, and a PhD-opportunity callout.

## What is included

- `index.html` — all page content and structure
- `styles.css` — dark liquid-glass design and responsive layout
- `script.js` — animated background and scroll-reveal effects
- `assets/hero-retina-data.webp` — hero artwork
- `assets/eye1k-atlas.webp` — Eye1k project artwork
- `assets/sccs-commitment.webp` — scCS project artwork
- `assets/Emil_Kriukov_CV.pdf` — downloadable CV
- `assets/Emil_Kriukov_CV.docx` — source CV document
- `assets/emil-profile.webp` — profile photo
- `assets/favicon.svg` — browser tab icon
- `.nojekyll` — tells GitHub Pages to serve the site as plain static files

There is no build step, package manager, or framework.

## Recommended repository setup

For the cleanest URL, create a public repository named:

`mcrewcow.github.io`

Upload **the contents of this folder** to the repository root. Do not upload the outer folder itself as a nested directory.

Your repository root should look like this:

```text
mcrewcow.github.io/
├── .nojekyll
├── README.md
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── Emil_Kriukov_CV.pdf
    ├── Emil_Kriukov_CV.docx
    ├── emil-profile.webp
    ├── favicon.svg
    ├── hero-retina-data.webp
    ├── eye1k-atlas.webp
    └── sccs-commitment.webp
```

## Publish on GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** as the branch and **/(root)** as the folder.
5. Click **Save**.
6. Wait for the Pages deployment to finish.

For a user-site repository named `mcrewcow.github.io`, the site will be at:

`https://mcrewcow.github.io/`

## Updating the website later

Edit or replace the relevant files in the repository and commit the changes. GitHub Pages will redeploy automatically.

- Text and links: `index.html`
- Styling/layout: `styles.css`
- Animation: `script.js`
- Images and CV: `assets/`

## Optional custom domain

In the repository, open **Settings → Pages → Custom domain**, enter the domain, configure the corresponding DNS records with the domain provider, and enable **Enforce HTTPS** once GitHub confirms the DNS configuration.
