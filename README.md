# UsefulWeb — Useful Websites Hub

A responsive interactive website directory built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — main page
- `style.css` — design and responsive layout
- `script.js` — website data and all interactions

## Features
- Search websites by name, category or description
- Category filters
- Favorites saved in localStorage
- Dark/light mode saved in localStorage
- Featured / A-Z / Favorites sorting
- Random "Surprise Me" website
- Responsive mobile layout
- Website cards with external links
- No backend required

## How to run
1. Extract the folder.
2. Open `index.html` in Chrome/Edge/Firefox.
3. Everything works directly in the browser.

## How to add another website
Open `script.js` and add an object inside the `websites` array:

{
  name: "Example",
  category: "Coding",
  icon: "💻",
  description: "Short description",
  url: "https://example.com/"
}

The category should match one of the categories already listed.

## Hosting
This can be hosted free on GitHub Pages, Netlify, Vercel or similar static hosting services.
