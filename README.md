# Shubham Meshram — Portfolio Website

A production-grade Full Stack Portfolio built with **Next.js 14 App Router**, **MongoDB**, **Shadcn UI**, **Framer Motion**, and **Cloudinary**.

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, React 18, Tailwind CSS, Shadcn UI, Framer Motion |
| Backend | Next.js API Routes, NextAuth.js |
| Database | MongoDB + Mongoose |
| Image Upload | Cloudinary |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
app/
├── (public)/           # Public-facing pages
│   ├── page.tsx        # Home
│   ├── about/
│   ├── projects/
│   ├── services/
│   ├── blog/
│   └── contact/
├── (admin)/            # Admin dashboard (protected)
│   └── admin/
│       ├── dashboard/
│       ├── projects/
│       ├── blogs/
│       └── leads/
├── api/                # API routes
│   ├── contact/
│   ├── projects/
│   ├── blogs/
│   ├── upload/
│   └── auth/
components/
├── ui/                 # Shadcn UI components
├── common/             # Navbar, Footer, SectionHeading
├── sections/           # Page sections
├── forms/              # React Hook Form forms
└── admin/              # Admin sidebar
models/                 # Mongoose models
lib/                    # db, auth, cloudinary, mailer
config/
└── site.ts             # All your personal data (edit this!)
```

---

## ⚙️ Setup

### 1. Clone & Install

```bash
git clone <repo>
cd portfolio
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=shubhcode97@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=shubhcode97@gmail.com
ADMIN_EMAIL=shubhcode97@gmail.com
ADMIN_PASSWORD=your-password
```

### 3. Seed Sample Projects (Optional)

```bash
npx tsx scripts/seed.ts
```

### 4. Run

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🔑 Admin Panel

- **URL**: `/admin/login`
- **Credentials**: Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Manage Projects, Blog Posts, and Contact Leads
- Upload images via Cloudinary
- Reply to leads directly via email

---

## 🎨 Customization

Edit `config/site.ts` to update:
- Personal info (name, email, phone, social links)
- Skills
- Work experience
- Education
- Services

---

## ☁️ Deploy on Vercel

```bash
npm run build
# Push to GitHub, connect to Vercel
# Add all env vars in Vercel dashboard
```

---

## 📄 License

MIT — Built by Shubham Meshram
