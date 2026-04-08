# JK Digi Tech — Digital Marketing Agency Website

> **Best Digital Marketing Agency in Tirupati, Andhra Pradesh**  
> 📞 +91 9701477827 | 📍 Tirupati, AP – 517501

---

## 🚀 Live Demo

Deploy to GitHub Pages or any static host — no build step required!

---

## 📁 File Structure

```
jkdigitech/
├── index.html              ← Main HTML (all sections + SEO meta tags)
├── css/
│   ├── style.css           ← Core styles, layout, components
│   ├── animations.css      ← Keyframes, scroll-reveal, micro-interactions
│   └── responsive.css      ← Mobile-first responsive breakpoints
├── js/
│   ├── canvas.js           ← Hero 3D canvas animation (WebGL-like with Canvas 2D)
│   ├── animations.js       ← Scroll reveal, counters, card tilt, parallax
│   └── main.js             ← Nav, mobile menu, form, WhatsApp button, cursor glow
├── assets/
│   └── favicon.svg         ← SVG favicon (cyan gradient)
└── README.md
```

---

## ✨ Features

### 🎨 Design
- **Dark theme** with aqua/cyan accent palette (`#06B6D4`, `#22D3EE`, `#67E8F9`)
- **3D animated hero canvas** — orbiting rings, glowing nodes, particle network, data streams
- **Floating badges** with smooth float animation
- **Gradient text** with shimmer effect
- **Glassmorphism** navbar on scroll

### 📱 Sections
1. **Hero** — 3D canvas background, CTA buttons, trust badges
2. **Stats Bar** — animated number counters
3. **Services** — 6 service cards with hover tilt
4. **About** — company info + metric grid
5. **Portfolio** — 4 case study cards
6. **Testimonials** — client reviews
7. **CTA Banner** — call to action with phone link
8. **Contact Form** — validated form with success state
9. **Footer** — links, social icons, legal copy

### ⚡ Performance & Interactions
- Scroll-reveal animations via IntersectionObserver (no jQuery)
- Canvas animation pauses when tab is hidden (saves battery)
- Mouse repulsion on particles
- Card tilt effect on hover
- Cursor glow on desktop
- Scroll progress bar
- Back-to-top button
- WhatsApp float button

### 🔍 SEO
- Full meta tags (title, description, keywords, robots)
- Geo meta tags for Tirupati location
- Open Graph + Twitter Card tags
- Schema.org LocalBusiness structured data (JSON-LD)
- Canonical URL
- Semantic HTML5 elements

---

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder `/`
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Custom Domain (jkdigitech.com)
1. Add a `CNAME` file with content: `jkdigitech.com`
2. In your domain registrar, add DNS records:
   ```
   A     185.199.108.153
   A     185.199.109.153
   A     185.199.110.153
   A     185.199.111.153
   CNAME www → yourusername.github.io
   ```

---

## 📦 No Dependencies

This is **pure HTML + CSS + Vanilla JS** — zero npm, zero build tools, zero frameworks.  
Just upload the files and it works.

---

## 🛠 Customization

| What to change | Where |
|---|---|
| Phone number | `index.html` — search `9701477827` |
| Address | `index.html` — search `517501` |
| Colors | `css/style.css` → `:root` variables |
| Services | `index.html` → `#services` section |
| Portfolio items | `index.html` → `#portfolio` section |
| Testimonials | `index.html` → `#testimonials` section |
| WhatsApp link | `js/main.js` → `initWhatsApp()` |
| Form endpoint | `js/main.js` → `submitForm()` |

---

## 📞 Contact

**JK Digi Tech**  
Tirupati, Andhra Pradesh – 517501  
📞 +91 9701477827  
🌐 www.jkdigitech.com

---

© 2025 JK Digi Tech. All rights reserved.
