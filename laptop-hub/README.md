# LaptopHub — Premium Laptop Store

A complete, responsive laptop e-commerce front-end built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Lucide icons** and **local JSON-style product data**. Prices are in PKR and the cart persists in `localStorage`.

---

## 1. Quick start (Roman Urdu)

```bash
# 1) project folder me jayen
cd laptop-hub

# 2) dependencies install karen
npm install

# 3) development server chalayen
npm run dev
```

Phir browser me kholen: **http://localhost:3000**

Production build dekhna ho to:

```bash
npm run build
npm start
```

> **Windows note:** agar PowerShell me `npm` par "running scripts is disabled" error aaye, to `npm.cmd install` aur `npm.cmd run dev` use karen — ya ek baar `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` chala lein.

---

## 2. Folder structure

```
laptop-hub/
├─ app/
│  ├─ layout.js              # root layout, fonts, navbar, footer, cart provider
│  ├─ globals.css            # Tailwind + design tokens
│  ├─ page.js                # Home
│  ├─ products/
│  │  ├─ page.js             # Product listing (filters, search, sort)
│  │  └─ [id]/page.js        # Dynamic product details
│  ├─ cart/page.js           # Shopping cart + demo checkout
│  ├─ accessories/page.js    # Accessories store
│  ├─ about/page.js          # About, shipping, warranty, FAQ, privacy
│  ├─ contact/page.js        # Contact + validated form
│  ├─ not-found.js           # Custom 404
│  └─ icon.png               # Favicon (from your logo)
├─ components/
│  ├─ Navbar.jsx             # Sticky nav, search overlay, cart badge
│  ├─ Footer.jsx
│  ├─ Hero.jsx
│  ├─ Categories.jsx
│  ├─ ProductCard.jsx
│  ├─ ProductGrid.jsx        # Client-side filtering + URL sync
│  ├─ ProductDetails.jsx
│  ├─ CartView.jsx
│  ├─ AccessoryCard.jsx
│  ├─ ContactForm.jsx
│  ├─ Newsletter.jsx
│  ├─ WhyChooseUs.jsx
│  ├─ Testimonials.jsx
│  ├─ OfferBanner.jsx
│  ├─ Reveal.jsx             # Scroll reveal animation
│  └─ Stars.jsx
├─ context/
│  └─ CartContext.jsx        # Cart state + localStorage + toast
├─ data/
│  ├─ products.js            # 14 laptops + categories + helpers
│  └─ accessories.js         # 6 accessories
└─ public/images/
   ├─ logo.png               # Your supplied logo
   └─ products/*.jpg         # Local, optimised product photos
```

---

## 3. Pages

| Route | Kya hai |
|---|---|
| `/` | Hero, categories, 8 featured laptops, offer banner, trust, reviews, newsletter |
| `/products` | Saare laptops + brand/price/RAM/category filters, search, sorting |
| `/products/[id]` | Dynamic product page — gallery, specs, stock, quantity, add to cart |
| `/cart` | Cart with quantity controls, totals, free-shipping meter, demo checkout |
| `/accessories` | 6 accessories, add-to-cart supported |
| `/about` | Story, values, process, shipping, warranty, FAQ, privacy |
| `/contact` | Contact channels + validated form + stylised map |

Filters URL me save hote hain, is liye link share karne par wahi result khulta hai:
`/products?category=gaming&brands=ASUS&sort=price-asc`

---

## 4. Apna data kaise badlein

### Logo
`public/images/logo.png` ko apne logo se replace kar dein (square PNG best hai). Favicon ke liye `app/icon.png` bhi replace karen.

### Products
`data/products.js` me `PRODUCTS` array edit karen. Har item ka shape:

```js
{
  id: "unique-slug",          // URL: /products/unique-slug
  name: "MacBook Pro 14",
  brand: "Apple",
  category: "creator",        // gaming | business | student | creator | ultrabook
  price: 649000,              // PKR
  oldPrice: 699000,           // optional (discount badge)
  image: "/images/products/macbook-pro.jpg",
  processor: "Apple M3 Pro",
  ram: 18,                    // number — filters isi par chalte hain
  storage: "512GB SSD",
  gpu: "...",
  display: "...",
  os: "...",
  battery: "...",
  weight: "...",
  color: "...",
  stock: 6,
  rating: 4.9,
  reviewCount: 214,
  badge: "Editor's choice",   // ya null
  featured: true,             // home page par dikhega
  description: "...",
  highlights: ["...", "..."],
}
```

Product images `public/images/products/` me rakhein. `next/image` automatically optimize karta hai.

### Categories / brands / price bands
`data/products.js` ke top par `CATEGORIES`, `BRANDS`, `PRICE_BANDS` aur `RAM_OPTIONS` hain — inhi se filters bante hain.

### Accessories
`data/accessories.js` me items add karen. Icon name `Mouse`, `Keyboard`, `Backpack`, `Usb`, `Monitor`, `Headphones` me se ho.

---

## 5. Cart kaise kaam karta hai

- `CartContext` React state + `localStorage` (`laptophub:cart:v1`) use karta hai.
- Add / remove / quantity change / subtotal / delivery / total sab live calculate hote hain.
- Delivery: **PKR 2,00,000** se upar free, warna **PKR 2,500**.
- "Proceed to Checkout" ek **demo order** place karta hai (koi payment gateway connected nahi).
- Toast notifications cart actions par show hote hain.

Real checkout lagane ke liye `CartView.jsx` ke `placeOrder` me apna API call ya Stripe/Checkout integration daal dein.

---

## 6. Forms (demo)

- Newsletter (`components/Newsletter.jsx`) — email validate karta hai, success message dikhata hai.
- Contact (`components/ContactForm.jsx`) — name/email/message validate karta hai, success panel dikhata hai.
- Dono front-end only hain. Backend ke liye `app/api/contact/route.js` bana kar `fetch("/api/contact", ...)` call karen.

---

## 7. Design tokens

`tailwind.config.js` aur `app/globals.css` me:

| Token | Value |
|---|---|
| Primary (ink) | `#111827` |
| Secondary (brand) | `#2563EB` |
| Background | `#F8FAFC` |
| Card | `#FFFFFF` |
| Text | `#1E293B` |
| Accent | `#06B6D4` |

Fonts: **Plus Jakarta Sans** (headings) + **Inter** (body), `next/font/google` se load hote hain.

---

## 8. Deploy (Vercel)

1. Project ko GitHub par push karen.
2. [vercel.com](https://vercel.com) par "New Project" → repo import karen.
3. Framework auto-detect ho jayega (Next.js). Koi environment variable zaroori nahi.
4. Deploy dabayen — done.

---

## 9. Production se pehle checklist

- [ ] `data/products.js` me real stock, prices aur specs
- [ ] Real product photos `public/images/products/` me
- [ ] WhatsApp/phone/email `components/Navbar.jsx`, `Footer.jsx`, `app/contact/page.js` me
- [ ] Contact aur newsletter forms ko backend se connect karen
- [ ] Payment gateway + real order storage
- [ ] Legal pages (returns, privacy) apni policy ke mutabiq
- [ ] Demo testimonials aur "4.9/5" figures replace karen

---

Built as a demo storefront. Product data, reviews and prices are sample content.
