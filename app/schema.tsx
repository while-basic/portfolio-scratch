export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Christopher Celaya",
  "url": "https://chriscelaya.com",
  "image": "https://chriscelaya.com/images/profile.jpg",
  "sameAs": [
    "https://github.com/chriscelaya",
    "https://linkedin.com/in/chriscelaya"
  ],
  "jobTitle": "Software Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Self-Employed"
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "University of Texas at El Paso",
      "department": "Electrical Engineering"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "El Paso Community College",
      "department": "Electrical Engineering & Computer Science"
    }
  ],
  "knowsAbout": [
    "Software Development",
    "Industrial Automation",
    "Mechatronics",
    "React",
    "Node.js",
    "HTML/CSS",
    "JavaScript",
    "Industrial Manufacturing",
    "Project Management",
    "Preventive Maintenance"
  ]
};

export const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Article",
      "name": "EcoTrack Case Study",
      "description": "Environmental monitoring and data visualization platform",
      "articleSection": "Case Study",
      "articleBody": "Developing a platform for monitoring and visualizing environmental data. We created a system that enables real-time tracking and analysis of environmental metrics.",
      "url": "https://chriscelaya.com/case-studies#ecotrack"
    },
    {
      "@type": "Article",
      "name": "SmartBudget Case Study",
      "description": "Personal finance management application with AI-powered insights",
      "articleSection": "Case Study",
      "articleBody": "Creating a personal finance management application that leverages AI for providing insights and recommendations. We developed a system that enables users to track their expenses and receive personalized financial advice.",
      "url": "https://chriscelaya.com/case-studies#smartbudget"
    },
    {
      "@type": "Article",
      "name": "Gemini Pro Vision Case Study",
      "description": "Integration of Google's Gemini Pro API for computer vision and text-to-speech capabilities.",
      "articleSection": "Case Study",
      "articleBody": "Integrating Google's Gemini Pro API for real-time vision and speech capabilities in a web interface. We built a web application that leverages machine learning for visual recognition and text generation.",
      "url": "https://chriscelaya.com/case-studies#gemini-pro-vision"
    },
    {
      "@type": "SoftwareApplication",
      "name": "EcoTrack",
      "applicationCategory": "Environmental Monitoring",
      "description": "Environmental monitoring and data visualization platform",
      "operatingSystem": "Web Browser"
    },
    {
      "@type": "SoftwareApplication",
      "name": "SmartBudget",
      "applicationCategory": "Personal Finance",
      "description": "AI-powered personal finance management application",
      "operatingSystem": "Web Browser"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Gemini Pro Vision",
      "applicationCategory": "Computer Vision",
      "description": "Real-time vision and text-to-speech capabilities using Google's Gemini Pro",
      "operatingSystem": "Web Browser"
    },
    {
      "@type": "SoftwareApplication",
      "name": "MIDI Saber",
      "applicationCategory": "Game Development",
      "description": "Virtual reality game interface with MIDI drum pad integration",
      "operatingSystem": "Web Browser"
    }
  ]
};
