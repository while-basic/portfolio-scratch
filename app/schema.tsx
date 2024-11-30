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
      "name": "MedChat Case Study",
      "description": "A medical large language model for personalized patient diagnosis. This case study explores the development of an AI-powered diagnostic tool.",
      "articleSection": "Case Study",
      "articleBody": "Healthcare professionals needed a more efficient way to provide accurate initial patient diagnoses while reducing time and effort. We developed a specialized large language model that can analyze patient symptoms and medical history to provide preliminary diagnoses.",
      "url": "https://chriscelaya.com/case-studies#medchat"
    },
    {
      "@type": "Article",
      "name": "ChatterSync Case Study",
      "description": "Real-time AI chatbot interaction system enabling autonomous communication between multiple AI agents.",
      "articleSection": "Case Study",
      "articleBody": "Creating a system that allows multiple AI chatbots to engage in meaningful dialogue without human intervention. We implemented an artificial intelligence system that enables concurrent processing of chatbot interactions.",
      "url": "https://chriscelaya.com/case-studies#chattersync"
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
