## Overview

This project is a functional admin portal built with **Next.js, TypeScript, MUI, API handling, code structure, and frontend architecture**. The portal includes authentication, data visualization on the dashboard, and basic onboarding offer functionality while integrating API.

## Live Link

[Live Deployment](https://hiublue-frontend-recruitment-nafisnihal.vercel.app/)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** Material UI (MUI)
- **Form Handling:** React Hook Form (Use validation like yup or zod)
- **Charting:** ApexCharts
- **State Management:** Context API and LocalStorage
- **Version Control:** GitHub
- **Deployment:** Vercel

## Notable Folder Structure

```
    └── 📁public
        └── 📁icons
    └── 📁src
        └── 📁app
            └── 📁(auth)
                └── 📁login
                    └── page.tsx
            └── 📁(dashboard)
                └── layout.tsx
                └── 📁onboarding
                    └── page.tsx
                └── page.tsx
            └── layout.tsx
        └── 📁components
            └── 📁dashboard
                └── 📁Offers
                    └── OffersTable.tsx
                └── 📁Stats
                    └── Stats.tsx
                └── 📁summary
                    └── Summary.tsx
                    └── SummaryCard.tsx
            └── 📁shared
                └── Header.tsx
                └── Sidebar.tsx
        └── 📁context
            └── AuthContext.tsx
        └── 📁sections
            └── 📁dashboard
                └── 📁views
                    └── dashboard-view.tsx
            └── 📁login
                └── custom-icons.tsx
                └── forgot-password.tsx
                └── 📁views
                    └── login-view.tsx
            └── 📁onboarding
                └── 📁views
                    └── onboarding-view.tsx
        └── 📁services
            └── apiService.ts
            └── authService.ts
            └── dashboardService.ts
            └── tokenService.ts
    └── .gitignore
    └── next-env.d.ts
    └── next.config.mjs
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
```

---

Happy coding! 🚀
