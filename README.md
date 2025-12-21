# 2026 - Goal Planner PWA 🚀

![2026 Goal Planner](public/icons/icon-512x512.png)

**Design Your Future.** 2026 is a premium, offline-first Progressive Web App (PWA) designed to help you track your goals, celebrate milestones, and build the life you dream of.

## ✨ Features

- **Offline-First Architecture**: Built with IndexedDB, your data lives on your device. Works perfectly without an internet connection.
- **Goal Management**: Create, update, and delete goals with ease.
- **Smart Progress Tracking**:
  - **Numeric Goals**: Track specific targets (e.g., "Read 10 books").
  - **Milestone Goals**: Break down complex goals into checklist items.
- **Gamification**: Unlock achievements and badges as you progress.
  - **Hall of Fame**: Showcase your "Visionary", "Achiever", and "Unstoppable" badges.
- **Premium UI**:
  - **Glassmorphism**: Modern, semi-transparent card designs.
  - **Animations**: Smooth transitions and hover effects.
  - **Responsive**: Looks great on mobile, tablet, and desktop.
- **PWA Support**: Installable on iOS, Android, and Desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Local Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via `idb`)
- **Backend (Optional)**: PostgreSQL + Prisma (Dockerized)
- **Validation**: Zod + React Hook Form

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker (optional, for PostgreSQL)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/2026.git
    cd 2026
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/2026_db"
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

## 🐳 Docker Setup (Optional)

To run the PostgreSQL database locally:

```bash
docker-compose up -d
```

## 👨‍💻 Author

**Wael Manai**

- Portfolio: [https://wael-manai.framer.website/](https://wael-manai.framer.website/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
