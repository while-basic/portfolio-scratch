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

## Todos should be completed starting from the most easiest to implement. The Todo list should be updated periodically and in order from easiest to most difficult for the AI to implement.

- [-] Initial setup
- [-] center navlinks
- [-] Navigation bar
- [-] About section
- [-] Projects section
- [-] Skills section
- [-] Experience section
- [-] Gallery section
- [-] Education section
- [-] Project tiles should be clickable
- [ ] Fix light/dark modes
- [-] Add resume page
  - [-] add cover letter podcast clip
  - [-] add resume podcast clip
- [ ] Light mode implementation
- [-] Add case studies
- [ ] Visitor counter
- [ ] Contact form
  - [ ] Set up resend email
- [-] Add breadcrumbs
  - [x] Add breadcrumbs to chat page
- [ ] Add Supabase integration
- [-] Add animations
- [-] Add unit tests
- [ ] Add resume download
- [ ] Add social media links
- [ ] Image generation
- [ ] Audio section
- [-] Chatbot for users signed in
- [ ] Admin dashboard
  - [ ] Total visitors
  - [ ] Total messages
  - [ ] Total users
  - [ ] Chat history
- [-] Add SEO
- [-] Add blog
- [-] Secret audio page
- [ ] Responsive on mobile
- [-] Loading screen
- [-] Update README.md
  - [-] Update all pages that have personal information that needs to be updated
- [ ] Add footer
- [ ] Add analytics
- [ ] Add analytics to dashboard
- [ ] Add settings page
- [ ] Projects tiles need to navigate to a case study page
- [ ] Blog heading needs to be styled correctly
- [-] Chat should have a notice about it being used for signed in users only
- [ ] Add avatar icons to chat
- [ ] Add admin dashboard

## Projects

- [ ] Medchat
- [ ] Midisaber
- [ ] Law-GPT
- [ ] Blockchain TLD Service
- [ ] 3D Blender Animation
- [ ] Unreal Engine 5 Game Environment
- [ ] Unity Game Environment
- [ ] Amica Medical Doctor
- [ ] Chattersync
- [ ] Gemini Pro Vision
- [ ] Replicate SDXL Image Generator
- [ ] SDXL Image Generator
- [ ] Ensemble
- [ ] Natural Language Translator
- [ ] Lanchain Agents
- [ ] AI Assistant
- [ ] Gemini Chat
- [ ] Custom GPT
- [ ] Groq Chat
- [ ] Change carasoul in gallery

## License

MIT License

## Acknowledgments

Built using:
- [v0.dev](https://v0.dev)
- [shadcn/ui](https://ui.shadcn.com/)
- [shadcn/ui-docs](https://ui.shadcn.com/docs)

## Personalizing Your Fork

After forking this repository, you'll need to update the following:

### Required Updates
1. **Personal Information**
   - `/app/config/site.ts`: Update site metadata, name, and social links
   - `/app/components/about.tsx`: Modify the about section content
   - `/app/components/hero.tsx`: Update hero section with your name and title
   - `/public/images/`: Replace profile and project images

2. **Project Details**
   - `/app/projects/page.tsx`: Update project cards with your own projects
   - `/app/projects/[slug]/page.tsx`: Create case studies for your projects

3. **Resume and Experience**
   - `/app/resume/page.tsx`: Update with your experience and education
   - `/public/resume.pdf`: Replace with your resume file

4. **Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Update the following variables:
     ```
     DATABASE_URL=your_database_url
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
     RESEND_API_KEY=your_resend_api_key
     ```

### Optional Updates
- `/app/blog/`: Add your own blog posts
- `/app/components/footer.tsx`: Update footer links and information
- `/app/components/nav.tsx`: Modify navigation items
- `/public/favicon.ico`: Replace with your own favicon
- `/app/layout.tsx`: Update metadata and default SEO settings

## Development Notes

### Git Commands
```bash
git status
git add .
git commit -m "update"
git push origin main
```

### Deployment

This project can be deployed on Vercel or any other Next.js-compatible hosting platform. Make sure to:
1. Configure environment variables in your hosting platform
2. Set up the necessary database connections
3. Update the deployment settings as needed

## Dashboard 

The dashboard will be a tool for monitoring and managing the website. It will include:
- Visitor count
- Message count
- User count
- Chat history

The dashboard will be accessible only to users with admin privileges.


## AI TODO

JavaScript Optimization

	6.	Code Splitting:
	•	Identify large JavaScript bundles and suggest splitting them into smaller chunks.
	•	Remove unused imports and third-party libraries.
	7.	Tree Shaking:
	•	Highlight modules that aren’t tree-shakable and suggest alternatives.
	•	Eliminate dead code and report overly large components.

API and Backend Optimization

	8.	Supabase Optimizations:
	•	Inspect API calls for inefficiencies and batch requests where possible.
	•	Verify Supabase tables have proper indexes for faster queries.
	•	Recommend caching strategies for frequently-accessed data.
	•	Propose Supabase Edge Functions for performance-critical API calls.
	9.	Data Fetching:
	•	Flag API requests in components and check if they can use getServerSideProps or getStaticProps for better performance.
	•	Enable caching using Next.js revalidate where appropriate.

Build and Deployment

	10.	Compression and Minification:
	•	Ensure JavaScript and CSS minification is enabled in next.config.js.
	•	Verify Brotli or gzip compression is active for Vercel deployment.
	11.	CDN:
	•	Confirm all static files in the public/ directory are served via the Vercel CDN.

Lazy Loading and Prefetching

	12.	Lazy Load Components:
	•	Identify and refactor non-critical components and assets to load lazily.
	•	Ensure images, scripts, and iframes use lazy loading.
	13.	Link Prefetching:
	•	Add or verify prefetch for Next.js Link components to pre-load page data when links are hovered.

Monitoring and Analytics

	14.	Lighthouse:
	•	Schedule automated performance audits and highlight areas needing improvement.
	•	Monitor metrics such as Largest Contentful Paint (LCP) and Time to Interactive (TTI).
	15.	Vercel Analytics:
	•	Inspect real-time performance logs and suggest actionable improvements.
	16.	Supabase Metrics:
	•	Review API and database query performance regularly. Report slow queries for optimization.

Execution Workflow

	•	Continuously run the above optimizations during development and build processes.
	•	Provide warnings for detected inefficiencies and suggest automated fixes where applicable.
	•	Flag code that introduces performance regressions after new commits.