export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Christopher Celaya",
  "url": "https://chriscelaya.com",
  "image": "https://chriscelaya.com/images/profile.jpg",
  "sameAs": [
    "https://github.com/chriscelaya",
    "https://linkedin.com/in/christophercelaya"
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
      "department": "Mechanical Engineering & Electrical Engineering & Computer Science"
    }
  ],
  "knowsAbout": [
    "Software Development",
    "Industrial Automation",
    "Mechatronics",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Computer Science",
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
      "name": "Gemini Pro Vision Case Study",
      "description": "Integration of Google's Gemini Pro API for computer vision and text-to-speech capabilities.",
      "articleSection": "Case Study",
      "articleBody": "Integrating Google's Gemini Pro API for real-time vision and speech capabilities in a web interface. We built a web application that leverages machine learning for visual recognition and text generation.",
      "url": ""
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
