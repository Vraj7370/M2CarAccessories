# 🚗 M2 Car Accessories — Premium Website

A production-ready, fully animated luxury automotive accessories website.

## 🛠 Tech Stack
- **React 19** + **Vite**
- **Tailwind CSS v3**
- **Framer Motion** — all animations
- **Fonts:** Bebas Neue + Rajdhani (Google Fonts)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🔧 How to Customize

### 1. Replace Your Logo
Put your logo file in `/public/` as `m2-logo.png` (already done — just replace the file).

Logo is used in:
- `Navbar.jsx` — top bar
- `Footer.jsx` — footer brand
- `Loader.jsx` — loading screen
- `index.html` — favicon

### 2. Replace Business Details
Open `src/data/siteData.js` and fill in all fields marked `// REPLACE:`:

```js
export const SITE_CONFIG = {
  phone1: "+91 XXXXX XXXXX",    // ← Your phone
  phone2: "+91 XXXXX XXXXX",    // ← Second phone
  whatsapp: "91XXXXXXXXXX",     // ← WhatsApp number (no + or spaces)
  email: "info@m2...",          // ← Your email
  address: "Shop No...",        // ← Full shop address
  instagram: "m2caraccessories",// ← Your Instagram handle
  facebook: "#",                // ← Facebook URL
  youtube: "#",                 // ← YouTube URL
  hours: { ... }                // ← Working hours
};
```

### 3. Replace Testimonials
In `src/data/siteData.js`, update the `TESTIMONIALS` array with real Google reviews from your customers.

### 4. Replace Instagram Images
Update `INSTAGRAM_POSTS` in siteData.js with your real Instagram post image URLs.

### 5. Update Products
Customize `PRODUCTS` array with your actual inventory, real images, and correct brand names.

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Cursor.jsx        — Custom gold cursor
│   ├── Loader.jsx        — Animated car loader screen
│   ├── Navbar.jsx        — Sticky responsive navbar with M2 logo
│   ├── Hero.jsx          — Full-screen hero with parallax + particles
│   ├── About.jsx         — About section with image stack
│   ├── Categories.jsx    — 6 categories with 3D tilt + filter
│   ├── Products.jsx      — Product showcase with 3D cards + inquiry modal
│   ├── Brands.jsx        — 16 brands grid + BrandsStrip marquee
│   ├── Testimonials.jsx  — Auto-play testimonials slider
│   ├── Appointment.jsx   — Appointment booking form
│   ├── Instagram.jsx     — Instagram masonry showcase
│   ├── Contact.jsx       — Contact form + info
│   └── Footer.jsx        — Full 4-col footer
├── data/
│   └── siteData.js       — ⭐ ALL editable business data lives here
└── index.css             — Global styles, animations, custom cursor
```

---

## ✨ Features
- ✅ Custom gold cursor with lag effect
- ✅ Animated car loader screen
- ✅ Parallax hero with mouse tracking
- ✅ Glitch text effect on headline
- ✅ Infinite marquee brand ticker
- ✅ 3D tilt cards (mouse-responsive)
- ✅ Category filter with expand panel
- ✅ Product inquiry modal
- ✅ Auto-play testimonials slider
- ✅ Appointment booking form with loading state
- ✅ Instagram masonry grid
- ✅ WhatsApp integration throughout
- ✅ Contact form with success state
- ✅ Fully responsive (mobile → desktop)
- ✅ SEO meta tags

---

## 📞 WhatsApp Integration
Every "Get Quote" and "WhatsApp" button auto-fills a message and opens WhatsApp.
Just set your `whatsapp` number in `siteData.js`.

---

*Built with ❤️ for M2 Car Accessories, Ahmedabad*
