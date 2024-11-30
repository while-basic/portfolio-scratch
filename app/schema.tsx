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
      "@type": "SoftwareApplication",
      "name": "MedChat",
      "applicationCategory": "Healthcare Application",
      "description": "Medical Large Language Model for accurate and personalized patient diagnosis",
      "operatingSystem": "Web Browser"
    },
    {
      "@type": "SoftwareApplication",
      "name": "ChatterSync",
      "applicationCategory": "Communication Software",
      "description": "AI-powered chatbot system enabling real-time dialogue between multiple chatbots",
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
