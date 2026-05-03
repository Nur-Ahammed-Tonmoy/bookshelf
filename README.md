# 📚 Bookshelf — Online Book Borrowing Platform

A seamless and modern web application that digitizes the traditional library experience. Users can explore a vast collection of books, filter by categories, and borrow titles digitally. Built with performance, security, and a beautiful design in mind.

## 🌐 Live URL

> [https://bookshelf-app.vercel.app](https://bookshelf-app.vercel.app)
> *(Update this after deploying to Vercel)*

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password login & Google OAuth via BetterAuth
- 📖 **12 Curated Books** — Story, Tech, and Science categories
- 🔍 **Search & Filter** — Full-text search + sidebar category filter
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- 👤 **User Profile** — View and update name and avatar
- 🔒 **Private Routes** — Book details and profile require login
- 📜 **Scrolling Marquee** — Live new arrivals ticker
- 🌟 **Featured Books** — Top 4 picks on the homepage
- 💬 **Testimonials Section** — Reader reviews carousel
- 🚀 **How It Works** — Step-by-step guide section
- 🎨 **Animate.css** — Smooth entrance animations on the hero

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Authentication | BetterAuth v1 |
| Database | MongoDB (via Mongoose) |
| Icons | React Icons |
| Notifications | React Hot Toast |
| Animation | Animate.css |

---

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework with App Router |
| `better-auth` | Full-stack authentication library |
| `mongoose` | MongoDB object modeling |
| `animate.css` | CSS animations for hero section |
| `react-hot-toast` | Beautiful toast notifications |
| `react-icons` | Icon library (FI, FA sets) |
| `tailwindcss` | Utility-first CSS framework |
| `daisyui` | Tailwind component library |

---

## 🗂️ Project Structure

```
bookshelf/
├── app/
│   ├── layout.js            # Root layout (Navbar + Footer + Toaster)
│   ├── page.js              # Home page
│   ├── globals.css          # Global styles + Tailwind
│   ├── all-books/
│   │   └── page.js          # All Books with search & filter
│   ├── book/[id]/
│   │   └── page.js          # Single Book Details (private)
│   ├── my-profile/
│   │   └── page.js          # User Profile (private)
│   ├── update-profile/
│   │   └── page.js          # Update Profile form (private)
│   ├── login/
│   │   └── page.js          # Login page
│   ├── register/
│   │   └── page.js          # Register page
│   └── api/auth/[...all]/
│       └── route.js         # BetterAuth API handler
├── components/
│   ├── Navbar.js            # Responsive navbar with auth state
│   ├── Footer.js            # Footer with social links + contact
│   └── BookCard.js          # Reusable book card component
├── lib/
│   ├── auth.js              # BetterAuth server config
│   ├── auth-client.js       # BetterAuth client config
│   └── books.js             # 12-book JSON dataset
├── .env.local.example       # Environment variable template
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookshelf.git
cd bookshelf
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_32_char_secret   # openssl rand -base64 32
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookshelf
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Setup

### BetterAuth
This project uses [BetterAuth](https://better-auth.com) for authentication.

1. Generate a secret: `openssl rand -base64 32`
2. Add it as `BETTER_AUTH_SECRET` in `.env.local`

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add `http://localhost:3000/api/auth/callback/google` as authorized redirect URI
5. Copy Client ID and Secret to `.env.local`

### MongoDB
1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user and whitelist your IP
3. Copy the connection string to `MONGODB_URI` in `.env.local`

---

## 📤 Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Add all environment variables in the Vercel dashboard under **Project Settings → Environment Variables**.

**Important:** Add your Vercel domain as an authorized origin:
- In `.env`: set `BETTER_AUTH_URL=https://your-app.vercel.app`
- In Google Console: add `https://your-app.vercel.app/api/auth/callback/google`

---

## 📝 Book Data Structure

```json
{
  "id": "1",
  "title": "The Midnight Library",
  "author": "Matt Haig",
  "description": "Between life and death there is a library...",
  "category": "Story",
  "available_quantity": 5,
  "image_url": "https://...",
  "rating": 4.5
}
```

Categories: `Story` | `Tech` | `Science`

---

## 🎨 Design Decisions

- **Color Palette**: Deep navy (`#1a2744`) + warm gold (`#c9a84c`) + cream (`#f8f5f0`)
- **Typography**: Georgia serif for headings, Inter for body text
- **Animations**: Animate.css for hero entrance, CSS transitions for cards
- **Layout**: Sidebar filter on All Books, two-column split on Book Details

---

## 👨‍💻 Git Commit Guidelines

This project includes 10+ meaningful commits:

1. `init: scaffold Next.js project with Tailwind and DaisyUI`
2. `feat: add BetterAuth configuration and API route`
3. `feat: implement Navbar with responsive mobile menu`
4. `feat: build Home page with hero, marquee, and featured books`
5. `feat: create All Books page with search and category filter`
6. `feat: add single Book Details page with borrow feature`
7. `feat: implement Login page with email and Google auth`
8. `feat: implement Register page with form validation`
9. `feat: add My Profile private route with user info`
10. `feat: add Update Profile page with BetterAuth updateUser`
11. `feat: create Footer with social links and contact info`
12. `feat: add How It Works and Testimonials sections`
13. `chore: add README and environment variable template`

---

## 📄 License

MIT — feel free to use this project for educational purposes.
