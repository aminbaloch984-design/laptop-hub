# LaptopHub — Premium Laptop Store (Pakistan)

LaptopHub ka complete storefront, do implementations ke saath:

| Folder | Stack | Kab use karein |
|---|---|---|
| [`laptop-hub/`](./laptop-hub) | Next.js 15 (App Router), React 19, Tailwind CSS | Production website / Vercel deploy |
| [`laptop-hub-static/`](./laptop-hub-static) | Plain HTML + CSS + JavaScript | Bina Node/build ke chalane ke liye (double-click `index.html`) |

Dono versions mein wahi branding, 14 laptops, 6 accessories, PKR pricing, filters,
product details, localStorage cart, demo checkout, newsletter aur contact form hai.

---

## 1. Next.js app (recommended)

```bash
cd laptop-hub
npm install
npm run dev
```

Kholen: **http://localhost:3000**

Production build:

```bash
npm run build
npm start
```

> Windows PowerShell mein agar `npm` par script error aaye to `npm.cmd install`
> aur `npm.cmd run dev` use karen.

### Pages

| Route | Content |
|---|---|
| `/` | Hero, 5 categories, 8 featured laptops, offer banner, trust, reviews, newsletter |
| `/products` | 14 laptops, brand/price/RAM/category filters, search, sorting, shareable URLs |
| `/products/[id]` | Gallery, key specs, stock, quantity, add to cart, related products |
| `/cart` | Quantity controls, free-shipping meter, totals, demo checkout |
| `/accessories` | 6 accessories with add-to-cart |
| `/about` | Story, values, process, shipping, warranty, FAQ, privacy |
| `/contact` | Contact channels, validated form, store details |

Filters URL mein save hote hain, e.g.
`/products?category=gaming&brands=ASUS&sort=price-asc`.

---

## 2. Static HTML site

Koi install nahi chahiye:

1. `laptop-hub-static/index.html` ko double-click karen, **ya**
2. folder ke andar simple server chalayen:

```bash
cd laptop-hub-static
python -m http.server 8130
```

Kholen: **http://localhost:8130**

Structure:

```
laptop-hub-static/
├─ index.html          # Home
├─ products.html       # Catalogue + filters
├─ product.html        # Detail page (?id=...)
├─ cart.html           # Cart + demo checkout
├─ accessories.html
├─ about.html
├─ contact.html
└─ assets/
   ├─ css/style.css
   ├─ js/  data.js, core.js, cart.js, layout.js, pages.js
   └─ images/ logo.png + products/*.jpg
```

Header, footer aur search overlay `layout.js` inject karta hai; product data
`assets/js/data.js` mein `window.LH_DATA` ke through hai.

---

## 3. Cart behaviour (dono versions)

- Storage key: `laptophub:cart:v1` (browser localStorage).
- Delivery: **PKR 2,00,000** se upar free, warna **PKR 2,500**.
- Quantity stock se zyada nahi ho sakti.
- Checkout demo hai — koi payment gateway connected nahi.

---

## 4. Design tokens

| Token | Value |
|---|---|
| Ink (headings/nav) | `#111827` |
| Brand blue | `#2563EB` |
| Page background | `#F8FAFC` |
| Card | `#FFFFFF` |
| Body text | `#1E293B` |
| Accent cyan | `#06B6D4` |

Fonts: **Plus Jakarta Sans** (headings) + **Inter** (body).

---

## 5. Deploy

### Next.js → Vercel
1. Vercel par **New Project** → yeh repo import karen.
2. **Root Directory** `laptop-hub` set karen.
3. Framework auto-detect hoga (Next.js). Environment variables ki zaroorat nahi.
4. Deploy.

### Static site → GitHub Pages / Netlify
- Publish directory: `laptop-hub-static`
- Build command: none

---

## 6. Production se pehle

- [ ] Real product data, prices aur stock (`laptop-hub/data/products.js`, `laptop-hub-static/assets/js/data.js`)
- [ ] Real product photos
- [ ] Phone / WhatsApp / email replace karen (placeholders hain)
- [ ] Contact aur newsletter forms backend se connect karen
- [ ] Payment gateway + real order storage
- [ ] Demo testimonials aur ratings replace karen
- [ ] Apni returns/privacy policy lagayen

---

Demo storefront — product data, reviews aur prices sample content hain.
