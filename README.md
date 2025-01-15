# Christopher Celaya Portfolio

A modern, responsive portfolio website built with Next.js 14, Tailwind CSS, and shadcn/ui.

## Features

- Dark mode support
- Fully responsive design
- Modern UI with gradient effects
- Fast page loads with Next.js
- Clean and intuitive navigation
- Sections for showcasing:
  - About
  - Projects
  - Skills
  - Experience
  - Gallery
  - Chat
  - Dashboard

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/                # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## Build Testing

This project includes automated build testing to ensure code quality and prevent broken builds from being pushed to the repository. The following checks are performed:

### Pre-commit Hooks

Before each commit, the following checks are automatically run:

1. TypeScript type checking (`npm run typecheck`)
2. ESLint code linting (`npm run lint`)
3. Next.js build verification (`npm run build`)

If any of these checks fail, the commit will be prevented until the issues are fixed.

### Manual Testing

You can also run the build tests manually:

```bash
npm run test-build
```

### GitHub Actions

The repository is configured with GitHub Actions to run build tests on:
- Every push to the main branch
- Every pull request to the main branch

The workflow checks:
- Dependency installation
- TypeScript type checking
- ESLint linting
- Next.js build process

## Environment Variables
Create a `.env.local` file with these variables:
```bash
# OpenAI (for Chat Feature)
OPENAI_API_KEY=your-openai-key

# Email (for Contact Form)
RESEND_API_KEY=your-resend-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## License

MIT License

## Acknowledgments

Built using:
- [v0.dev](https://v0.dev)
- [shadcn/ui](https://ui.shadcn.com/)
- [shadcn/ui-docs](https://ui.shadcn.com/docs)

## Development Notes

### Git Commands
```bash
git status
git add .
git commit -m "update message"
git push
git push origin main
```

### Deployment

This project can be deployed on Vercel or any other Next.js-compatible hosting platform. Make sure to:
1. Configure environment variables in your hosting platform
2. Set up the necessary database connections
3. Update the deployment settings as needed
