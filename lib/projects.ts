export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  slug: string;
}

// This function would typically fetch from a CMS or database
// For now, we'll use static data
export async function getProjects(): Promise<Project[]> {
  // In a real app, this would be an API call or database query
  return [
    {
      title: "MedChat",
      description: "An AI-powered chatbot designed to assist medical professionals with real-time diagnosis and medical literature recommendations.",
      tags: ["Next.js", "Node.js", "Supabase", "Llama2"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/medchat.png",
      slug: "medchat"
    },
    {
      title: "MidiSaber",
      description: "A unique music production tool leveraging motion-controlled MIDI interfaces.",
      tags: ["Novation Launchpad", "MIDI", "C++", "JavaScript, Node.js"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/midi-saber.png",
      slug: "midisaber"
    },
    {
      title: "Law-GPT",
      description: "A GPT-based legal assistant providing case law summaries, legal precedent analysis, and document drafting.",
      tags: ["OpenAI", "LangChain", "Next.js"],
      githubUrl: "https://github.com/christophercelaya/",
      liveUrl: "https://",
      imageUrl: "/images/projects/law-gpt.png",
      slug: "law-gpt"
    },
    {
      title: "Blockchain TLD Service",
      description: "A blockchain-based platform for managing custom top-level domains (TLDs).",
      tags: ["Ethereum", "Solidity", "React"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/top-level.png",
      slug: "blockchain-tld"
    },
    {
      title: "3D Blender Animation",
      description: "An animated short created using Blender, showcasing advanced rendering and storytelling techniques.",
      tags: ["Blender", "3D Animation", "Rendering"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/blender.png",
      slug: "3d-blender-animation"
    },
    {
      title: "Unreal Engine 5 Game Environment",
      description: "A photorealistic game environment created with Unreal Engine 5, featuring Lumen and Nanite.",
      tags: ["Unreal Engine 5", "Blueprints", "Game Design"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/unreal.png",
      slug: "ue5-game-environment"
    },
    {
      title: "Unity Game Environment",
      description: "An immersive 3D environment for Unity games, optimized for performance and interactivity.",
      tags: ["Unity", "C#", "Game Design"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/unity.png",
      slug: "unity-game-environment"
    },
    {
      title: "Amica Medical Doctor",
      description: "A comprehensive AI platform designed to assist medical practitioners with diagnostic and administrative tasks.",
      tags: ["Next.js", "AI", "OpenAI API"],
      githubUrl: "https://github.com/while-basic/",
      liveUrl: "https://",
      imageUrl: "/images/projects/amica.png",
      slug: "amica-medical-doctor"
    },
    {
      title: "Chattersync",
      description: "A multi-channel real-time chat application for teams, with AI-powered suggestions and insights.",
      tags: ["WebSocket", "React", "Node.js"],
      githubUrl: "https://github.com/while-basic/ChatterSync",
      liveUrl: "https://chatter-sync.vercel.app",
      imageUrl: "/images/projects/chattersync.png",
      slug: "chattersync"
    },
    {
      title: "Gemini Pro Vision",
      description: "A next-generation image processing tool with AI enhancements for photographers and videographers.",
      tags: ["Python", "Gemini Pro", "Computer Vision"],
      githubUrl: "https://github.com/while-basic/gemini/",
      liveUrl: "https://gemini-three-indol.vercel.app",
      imageUrl: "/images/projects/gemini.png",
      slug: "gemini-pro-vision"
    },
    {
      title: "Natural Language Translator",
      description: "An AI-powered translator capable of understanding and translating natural language text with high accuracy.",
      tags: ["Transformers", "Hugging Face", "Next.js"],
      githubUrl: "https://github.com/while-basic/ai-code-translator",
      liveUrl: "https://ai-code-translator-pied-zeta.vercel.app",
      imageUrl: "/images/projects/nl-translator.png",
      slug: "natural-language-translator"
    }
  ];
}