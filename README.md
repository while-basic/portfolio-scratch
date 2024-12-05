# Todo List
- [ ] Integrate bitcoin price api
  - [ ] curl --location 'https://api.coindesk.com/v1/bpi/currentprice.json'
- [ ] add web3 login
- [ ] interactive art gallery where users can share their creations, uploads, and view others' work
- [ ] add a comments section for images
- [ ] use vercel ai sdk for chat and streaming
- [ ] add a chatbot for signed-in users
- [ ] add a dashboard for signed-in users (in progress)
- [ ] add a secret audio page
  - [ ] add a resume page with ai podcast clips
- [ ] add daily ai tip or fact dialog alert when user signs in
- [ ] include token usage metrics in dashboard
  - [ ] total conversations
  - [ ] total characters generated
  - [ ] total generations
  - [ ] total cost
  - [ ] remaining monthly quota
  - [ ] show graphs or progress bars for better visualization
- [ ] add gallery for generated images to navlinks
- [ ] add shortcuts for frequently used tools
  - [ ] Start a New Chat
  - [ ] Generate an Image


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

### 6. Blog (in-progress)
- **Blog Posts** (`/app/blog/`)
  - Add your own posts
  - Update blog layout
  - Customize categories

### 7. Dashboard (in-progress)
- **Dashboard** (`/app/dashboard/page.tsx`)
  [ ] Fix visitor counter
  [ ] Choose analytics
  [ ] Responsive on desktop
  [ ] Reponsive on mobile
  [ ] Connect all metrics to Supabase
  [ ] Add sidebar with relevant options

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

This list is prioritized from highest to lowest priority. It is regularly updated to reflect current progress and new requirements.

### Completed Tasks
- [x] Initial setup and core features
- [x] Navigation and layout
  - [x] Center navlinks
  - [x] Navigation bar
  - [x] Add breadcrumbs
  - [x] Add footer to home page
  - [x] Make site responsive on mobile
  - [x] Add loading screen
- [x] Content sections
  - [x] About section
  - [x] Projects section
  - [x] Skills section
  - [x] Experience section
  - [x] Gallery section
  - [x] Education section
  - [x] Blog section
  - [x] Case studies
- [x] Interactive features
  - [x] Make project tiles clickable
  - [x] Add animations
  - [x] Create secret audio page
  - [x] Add resume page with podcast clips
- [x] Chat functionality
  - [x] Implement chatbot for signed-in users
  - [x] Add notice about chat for signed-in users only
  - [x] Add estimated cost to chat
  - [x] Add total cost for chat
  - [x] Remove right sidebar from chat
- [x] Documentation and testing
  - [x] Add unit tests
  - [x] Add SEO
  - [x] Update README.md
  - [x] Update all pages with personal information

### High Priority Tasks
- [ ] Authentication and User Experience
  - [ ] Chat modes should not work when not signed in
  - [ ] Make profile data persistent
  - [ ] Ability to delete conversations
  - [ ] Fix light/dark modes
  - [ ] Add social media links
  - [ ] Create contact form with Resend email

- [ ] Chat Improvements
  - [ ] Make chat responsive on mobile
  - [ ] Add avatars to chat interface
  - [ ] Implement streaming support
  - [ ] Add scroll to latest message
  - [ ] Add realtime capabilities
  - [ ] Add cost for audio generation
  - [ ] Add color code start/stop for recording

- [ ] Analytics and Dashboard
  - [ ] Add visitor counter
  - [ ] Add total messages sent/received counter
  - [ ] Add total users registered counter
  - [ ] Add total message count

### Medium Priority Tasks
- [ ] Chat Features
  - [ ] Implement different AI models
    - [ ] ChatGPT
    - [ ] Claude
    - [ ] Llama
    - [ ] Gemini
  - [ ] Add support for voice chat
  - [ ] Add gallery for generated images
  - [ ] Collapsible sidebars

- [ ] Content Management
  - [ ] Add resume download functionality
  - [ ] Develop comprehensive audio page
  - [ ] Add option to download audio

### Future Enhancements
- [ ] Performance Optimizations
  - [ ] Optimize chat performance
  - [ ] Optimize performance for large datasets
  - [ ] Implement advanced search functionality

- [ ] Advanced Features
  - [ ] Add multimodal support
    - [ ] Vision capabilities
    - [ ] File upload support
  - [ ] Integrate with additional third-party services
  - [ ] Implement user feedback system
  - [ ] Add interactive tutorials

### Projects to Add
- [ ] AI/ML Projects
  - [ ] Medchat
  - [ ] Law-GPT
  - [ ] Amica Medical Doctor
  - [ ] Natural Language Translator
  - [ ] Langchain Agents
  - [ ] AI Assistant
  - [ ] Custom GPT
  - [ ] Groq Chat

- [ ] Creative Projects
  - [ ] 3D Blender Animation
  - [ ] Unreal Engine 5 Game Environment
  - [ ] Unity Game Environment

- [ ] Web3 Projects
  - [ ] Blockchain TLD Service
  - [ ] Ensemble

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
