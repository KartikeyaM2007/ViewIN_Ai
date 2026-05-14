# Inview_AI

Inview_AI is a modern web application built with **Next.js**, designed to streamline interview creation, participation, and feedback. It leverages **Firebase** and **TailwindCSS** with support from **shadcn/ui** components for a stylish, responsive experience.

# Link to Website
https://inview-ai.vercel.app/

## ✨ Features

- 🔐 Authentication with Sign In / Sign Up pages
- 🎤 Resume-based Interview Creation
- 📋 Interview Feedback & Scoring
- 📄 Resume Analysis + ATS Scoring
- 🧠 Smart AI integration (via Vapi)

- ⚙️ Firebase Admin SDK & Session Cookies for Auth
- ✨ Smooth UI/UX with shadcn/ui + Tailwind

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Vapi API](https://vapi.ai/) 

## Getting Started



```
git clone https://github.com/yourusername/inview_ai.git
cd inview_ai/inview_ai
```

## 2. Install Dependencies

npm install
or
yarn install

## 3. Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token
```

## 4.Run the Development Server
```
npm run dev
```

## 5. Project Structure

```
inview_ai/
├── app/                  # Application routes
│   ├── (auth)/           # Sign in / Sign up pages
│   ├── (root)/           # Main app routes like dashboard, interview
│   └── api/              # API routes (e.g., Vapi)
├── components/           # UI components (if applicable)
├── constants/            # Global constants
├── types/                # TypeScript definitions
├── public/               # Static assets
├── styles/               # Global styles
├── .env.local            # Environment variables (not committed)
├── package.json
└── tsconfig.json
```


## 6. Scripts
```
npm run dev – Start the development server

npm run build – Build for production

npm run lint – Lint the project
```

<b><u>Contributing</u></b>

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.