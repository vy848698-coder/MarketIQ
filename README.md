# Market IQ — Digital Marketing Agency Website

A fast, lightweight multi-page website built with **plain HTML5 + CSS3 + vanilla JavaScript**.
No frameworks, no build step, no dependencies — just open the files in a browser.

## Why this stack?
You asked for the fastest possible experience. Static HTML/CSS/JS is the fastest a
website can be: no JS framework to download/parse, no server rendering, instant loads.
It also deploys for free anywhere (Netlify, GitHub Pages, Vercel, Cloudflare Pages).

## Libraries included (all via CDN — no install needed)
| Library | Purpose | How to use |
|---|---|---|
| **Google Fonts** (Fraunces + Inter) | Typography | Already applied site-wide in `style.css` |
| **Font Awesome 6.5** | Icon set | Add an icon anywhere: `<i class="fa-solid fa-rocket"></i>` |
| **AOS 2.3** | Scroll animations | Add `data-aos="fade-up"` to any element. Initialized in `main.js` |
| **Swiper 11** | Sliders / carousels | Testimonials slider on the home page. Init in `main.js` |
| **GLightbox 3.3** | Image / video lightbox | Add `class="glightbox"` to any `<a>` wrapping an image |
| **Counter animation** | Animated stat numbers | Built-in (vanilla JS). Add `data-count="100" data-suffix="%"` to any element |

> The site also ships its own lightweight scroll-reveal (`.reveal` class + IntersectionObserver)
> as a no-dependency fallback, so animations still work even if a CDN is blocked.

### Counter attributes
`data-count` (target number, required) · `data-decimals` (e.g. `1` for 3.4) ·
`data-prefix` (e.g. `$`) · `data-suffix` (e.g. `%`, `x`, `+`).

## File structure
```
Market-IQ/
├── index.html        Home (hero, services preview, results, stats, CTA)
├── services.html     All 6 services + process steps
├── about.html        Story, values, stats
├── contact.html      Contact form + phone/email/socials
├── css/
│   └── style.css     All shared styling (design tokens via CSS variables)
├── js/
│   └── main.js       Mobile menu, scroll-reveal animations, contact form
├── images/           Logos & assets
└── README.md
```

## How to run it
Just double-click `index.html`, **or** for live-reload while editing:
```bash
# VS Code: install the "Live Server" extension, right-click index.html → "Open with Live Server"
# or with Python:
python -m http.server 8000   # then open http://localhost:8000
```

## To finish before going live
- [ ] Wire the contact form to a real backend (Formspree / EmailJS / your own API).
      See the NOTE in `js/main.js`.
- [ ] Replace placeholder Instagram / LinkedIn links in the footer.
- [ ] Add real client logos / case studies if available.
- [ ] Add a favicon and an Open Graph share image.

## Customizing the look
All colors, fonts and spacing live as CSS variables at the top of `css/style.css`
(the `:root { ... }` block). Change them once and every page updates.
