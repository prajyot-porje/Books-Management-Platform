# LibraryHub

LibraryHub is a modern, full-stack library management platform built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/). It enables users to discover, borrow, and manage books, while providing an admin interface for library staff.

## Features

- User authentication and authorization with [Clerk](https://clerk.com/)
- Beautiful, responsive UI with [Tailwind CSS](https://tailwindcss.com/)
- Animated UI elements using [Framer Motion](https://www.framer.com/motion/)
- Modular component structure (Custom, UI)
- Book borrowing, history tracking, and admin management
- Type-safe backend and frontend with TypeScript
- Optimized font loading with [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- RESTful API routes for data operations
- **Webhook integration for real-time user management**
- **MongoDB database using [Mongoose](https://mongoosejs.com/)**
- Environment variable support for secure configuration

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS Modules
- **Authentication:** Clerk
- **Animation:** Framer Motion
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Webhooks:** Clerk webhooks for user lifecycle events
- **State Management:** React Hooks
- **UI Components:** Custom and reusable components in `/components/Custom` and `/components/ui`

## Folder Structure

```
.
├── app/                # Next.js app directory (routing, pages, layouts)
│   ├── (auth)/         # Auth-related routes
│   ├── (root)/         # Main landing and user pages
│   ├── api/            # API route handlers
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/
│   ├── Custom/         # Custom components (BookModal, Header, etc.)
│   └── ui/             # UI primitives (Button, Tabs, Table, etc.)
├── constants/          # App-wide constants
├── lib/
│   ├── actions/        # Server actions
│   ├── database/       # Database models and config
│   └── utils.ts        # Utility functions
├── public/             # Static assets (images, icons)
├── types/              # TypeScript types
├── .env.local          # Environment variables
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/libraryhub.git
   cd libraryhub
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your Clerk and database credentials.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Lint the codebase

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.  
See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Customization

- **Fonts:** Uses [Geist](https://vercel.com/font), [Poppins](https://fonts.google.com/specimen/Poppins), and [Inter](https://fonts.google.com/specimen/Inter) via `next/font`.
- **Icons:** Uses [Lucide React](https://lucide.dev/).
- **Authentication:** Managed by Clerk, see `/app/layout.tsx` and `/app/(root)/user/layout.tsx`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

**Made with ❤️ using Next.js, TypeScript, Tailwind CSS, and Clerk.**
