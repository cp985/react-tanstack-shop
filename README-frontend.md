# ⚔️ React TanStack Shop — The Golden Pixel Inn

A pixel-art themed e-commerce web app built with React, TanStack Query and React Router. Users can browse a fantasy item shop, filter and search products, manage their profile, and place orders with a full checkout flow.

🔗 **Live Demo:** [cp985.github.io/react-tanstack-shop](https://cp985.github.io/react-tanstack-shop/#/app/shop)  
🔗 **Backend Repo:** [react-tanstack-shop-backend](https://github.com/cp985/react-tanstack-shop-backend)

---

## 🖼️ Tech Stack

| Technology | Role |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing (hash router) |
| TanStack Query v5 | Server state, caching, mutations |
| use-immer | Immutable state management |
| pixelarticons | Pixel-art SVG icon components |
| CSS Modules | Scoped component styling |
| Vite | Build tool & dev server |

---

## ✨ Features

### 🛒 Shop
- Browse 100+ fantasy items with pixel-art sprite sheet rendering
- Real-time search bar with debounced filtering
- Sidebar filter panel (sort, rarity, type, class, price range) with pixel animation on open
- Item detail page with stock/availability management
- Sales section with animated background sprite

### 🧺 Cart
- Add/remove items, quantity management
- Cart persisted in context
- Cart count displayed in navbar

### 👤 Account & Auth
- JWT-based authentication (login / register)
- Token expiry check on every query/mutation — auto logout on expiry
- Profile page: update name, surname, email, password, address, phone
- Full client-side form validation with regex (email, password strength, address, CAP, phone)

### 📦 Orders
- Checkout modal with shipping address pre-populated from user profile
- Order success state with redirect to order history
- Order history page

### 🎨 UI / UX
- Pixel-art theme with custom CSS animations (`steps()` easing)
- Light/dark theme toggle
- Responsive layout — mobile first, tested on Safari iOS and Chrome Android
- `position: sticky` sidebar that follows scroll without JavaScript
- `@media (hover: hover) and (pointer: fine)` to prevent sticky hover on touch devices

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/cp985/react-tanstack-shop.git
cd react-tanstack-shop

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=https://your-backend-url.onrender.com" > .env

# Start dev server
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Page wrapper layouts
│   └── UI/           # Reusable components (Button, Input, Cards, Modals...)
├── context/          # FilteredItemsContext — global state
├── pages/            # Route-level page components
└── util/             # Auth helpers, regex validators, HTTP requests, sprite map
```

---

## 🔗 Backend

The backend is a REST API built with Express/Node, MongoDB and JWT auth, deployed on Render.  
See the [backend repository](https://github.com/cp985/react-tanstack-shop-backend) for setup instructions.
