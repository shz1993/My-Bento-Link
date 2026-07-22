# 🍱 My Bento Link

**My Bento Link** is a modern *Link-in-Bio* application inspired by Bento.me and Linktree. This app allows users to create a customized public profile page that elegantly displays social links, portfolios, and personal information.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🌐 Live Demo & Preview

Try this app! :
👉 **[https://my-bento-link.vercel.app/](https://my-bento-link.vercel.app/)**

## ✨ Key Features

- 👤 **Dynamic Profile Page (`/[username]`)**: Each user has a unique public link based on their username.
- 🔗 **Link Management**: Add, edit, and delete links through the user dashboard.
- 🔐 **Secure Authentication**: Powered by Supabase Auth (Email & Password).
- 🛡️ **Data Security**: Integrated Row Level Security (RLS) on Supabase database.
- 🎨 **Responsive & Modern UI**: Clean and responsive design built with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Local Setup Guide

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+) and [Git](https://git-scm.com/) installed.

### 2. Clone Repository
```bash
git clone https://github.com/shz1993/My-Bento-Link.git
cd My-Bento-Link
```

### 3. Instal Dependency
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the project root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Supabase Database Schema
Run the following SQL queries in the Supabase SQL Editor to set up the required tables:

```sql
-- Tabel Profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Links
CREATE TABLE public.links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);



### 6. Run Local Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.


