# Itera-Web-Q
**A Generative AI Tool for Constructing Web Frontend with Integration of Quality Feedback Loop**

## Key Features
- **AI-Powered Code Generation**: Uses Google's Gemini LLM to generate plain HTML, CSS, and Vanilla JS frontends from natural language requirements.
- **Automated Quality Feedback Loop**: Integrates multiple assessment tools:
  - *Usability Heuristic*: Checks for UI/UX consistencies and best practices.
  - *Lighthouse*: Audits performance, SEO, accessibility and best practices.
  - *Pa11y*: Validates web accessibility (WCAG).
  - *Green Software*: Analyzes and optimizes structural elements for sustainable web development.
- **Iterative Refinement**: Autonomously refines the generated code based on the integrated audit reports.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **AI Integration**: Google Generative AI SDK (gemini-3-flash-preview)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v18.17.0 or newer)
- npm, yarn, pnpm, or bun
- A running MongoDB instance (local or MongoDB Atlas)
- A Google API Key with access to the Gemini API

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd itera-web-q
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory (see the [Environment](#environment) section below).

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `.next` folder.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint, Stylelint, and Biome to check for linting errors.

## Project Structure

```
ai-sandbox/
├── src/
│   ├── app/                # Next.js App Router (Pages, API Routes, Layouts)
│   │   ├── api/            # API endpoints (Auth, CodeGen, Heuristics, Lighthouse, etc.)
│   │   └── components/     # Reusable React components
│   ├── lib/                # Utility functions, database configuration, and parsing models
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets (images, fonts, outputs)
├── biome.json              # Biome configuration for fast formatting
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

## Environment

Create a `.env.local` file in the root of your project and configure the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/itera_web_q

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_here

# Google Generative AI (Gemini)
GOOGLE_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3-flash-preview
```