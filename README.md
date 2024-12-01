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

## Personalizing Your Portfolio

After forking this repository, you'll need to update various files with your personal information. Here's a comprehensive guide based on the actual project structure:

### 1. Core Components
- **Navbar** (`/components/navbar.tsx`)
  - Update navigation links
  - Modify logo and branding
  - Customize menu items

- **Hero Section** (`/components/hero.tsx`)
  - Update main headline
  - Modify tagline and description
  - Change call-to-action buttons

- **Layout** (`/app/layout.tsx`)
  - Update metadata and SEO settings
  - Modify default page structure
  - Customize loading screen

### 2. Main Pages
- **Home Page** (`/app/page.tsx`)
  - Update hero content
  - Modify featured projects
  - Customize welcome message

- **About Page** (`/app/about/page.tsx`)
  - Update biography
  - Modify personal story
  - Add professional background

- **Projects** (`/app/projects/page.tsx`)
  - Update project cards (`/components/project-card.tsx`)
  - Add your own projects
  - Customize project descriptions

- **Experience** (`/app/experience/page.tsx`)
  - Update work history (`/components/experience-card.tsx`)
  - Add education details (`/components/education-card.tsx`)
  - Modify role descriptions

### 3. Skills and Expertise
- **Skills Page** (`/app/skills/page.tsx`)
  - Update skill sections (`/components/skills-section.tsx`)
  - Modify skill cards (`/components/skill-card.tsx`)
  - Customize tag cloud (`/components/skills-tag-cloud.tsx`)

### 4. Interactive Features
- **Gallery** (`/app/gallery/page.tsx`)
  - Update gallery items (`/components/gallery-item.tsx`)
  - Modify filters (`/components/gallery-filter.tsx`)
  - Add your own images

- **Chat** (`/app/chat/page.tsx`)
  - Customize chat interface
  - Update AI settings
  - Modify authentication requirements

- **Audio** (`/app/audio/page.tsx`)
  - Add your audio content
  - Update audio player settings
  - Customize audio descriptions

### 5. Professional Content
- **Resume** (`/app/resume/page.tsx`)
  - Update resume content
  - Add professional experience
  - Upload new resume PDF

- **Case Studies** (`/app/case-studies/page.tsx`)
  - Add detailed project analyses
  - Include project outcomes
  - Update metrics and results

### 6. Blog
- **Blog Posts** (`/app/blog/`)
  - Add your own posts
  - Update blog layout
  - Customize categories

### 7. Environment Variables
Create a `.env.local` file with these variables:
```bash
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OpenAI (for Chat Feature)
OPENAI_API_KEY=your-openai-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Email (for Contact Form)
RESEND_API_KEY=your-resend-key
```

### 8. Assets and Media
- **Public Directory** (`/public/`)
  - Replace profile images
  - Update project screenshots
  - Add custom icons and media
  - Update resume PDF
  - Modify audio files

### 9. UI Components
- **Custom Components** (`/components/ui/`)
  - Customize button styles
  - Update card designs
  - Modify form elements
  - Adjust animations

### 10. Additional Features
- **Dashboard** (`/app/dashboard/page.tsx`)
  - Configure visitor counter
  - Set up analytics
  - Customize admin features

Remember to:
1. Test all changes locally using `npm run dev`
2. Verify responsive design on multiple devices
3. Check all links and media work correctly
4. Update SEO metadata for all pages
5. Remove placeholder content

## Todo List

This list is prioritized from easiest to most challenging tasks. It should be updated regularly to reflect current progress and new requirements.

### Completed Tasks
- [x] Initial setup
- [x] Center navlinks
- [x] Navigation bar
- [x] About section
- [x] Projects section
- [x] Skills section
- [x] Experience section
- [x] Gallery section
- [x] Education section
- [x] Make project tiles clickable
- [x] Add resume page
  - [x] Add cover letter podcast clip
  - [x] Add resume podcast clip
- [x] Add case studies
- [x] Add breadcrumbs
  - [x] Add breadcrumbs to chat page
- [x] Add animations
- [x] Add unit tests
- [x] Implement chatbot for signed-in users
- [x] Add SEO
- [x] Add blog
- [x] Create secret audio page
- [x] Make site responsive on mobile
- [x] Add loading screen
- [x] Update README.md
  - [x] Update all pages with personal information
- [x] Style blog heading correctly
- [x] Add notice about chat for signed-in users only
- [x] Implement ChatGPT clone with Supabase integration
- [x] Add estimated cost to chat
- [x] Add total cost for chat

### High Priority Tasks
- [ ] Add footer to home page
- [ ] Ability to delete conversations
- [ ] Add social media links
- [ ] Fix light/dark modes
- [ ] Add visitor counter
- [ ] Create contact form
  - [ ] Set up Resend email
- [-] Complete Supabase integration
- [ ] Add resume download functionality
- [ ] Make chat responsive on mobile
- [ ] Correct styling on chat page
- [-] Add avatars to chat interface
- [ ] Implement system prompts in chat
- [-] Add option to change AI models
- [ ] Add Markdown support to chat
- [ ] Implement code highlighting in chat
- [ ] Enhance admin dashboard
  - [ ] Add total messages sent/recieved counter
  - [ ] Add total users registered counter
- [ ] Implement streaming support for chat
- [ ] Add AI assistants to chat
- [ ] Add total message count to dashboard
- [ ] Implement image generation feature
- [ ] Develop audio section
- [ ] Add support voice chat
- [ ] Add options to change model

### Future Enhancements
- [ ] Optimize performance for large datasets
- [ ] Implement advanced search functionality
- [ ] Add multilingual support
- [ ] Integrate with additional third-party services
- [ ] Implement user feedback system
- [ ] Add interactive tutorials for new users


## Projects

- [ ] ChatGPT Clone
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