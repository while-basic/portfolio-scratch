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
      githubUrl: "https://github.com/while-basic/medchat",
      liveUrl: "https://",
      imageUrl: "/images/projects/medchat.png",
      slug: "medchat"
    },
    {
      title: "MidiSaber",
      description: "A unique music production tool leveraging motion-controlled MIDI interfaces.",
      tags: ["Novation Launchpad", "MIDI", "C++", "JavaScript, Node.js"],
      githubUrl: "https://github.com/while-basic/midisaber",
      liveUrl: "https://",
      imageUrl: "/images/projects/midi-saber.png",
      slug: "midisaber"
    },
    {
      title: "Law-GPT",
      description: "A GPT-based legal assistant providing case law summaries, legal precedent analysis, and document drafting.",
      tags: ["OpenAI", "LangChain", "Next.js"],
      githubUrl: "https://github.com/christophercelaya/law-gpt",
      liveUrl: "https://",
      imageUrl: "/images/projects/lawgpt.jpg",
      slug: "law-gpt"
    },
    {
      title: "Blockchain TLD Service",
      description: "A blockchain-based platform for managing custom top-level domains (TLDs).",
      tags: ["Ethereum", "Solidity", "React"],
      githubUrl: "https://github.com/christophercelaya/blockchain-tld",
      liveUrl: "https://",
      imageUrl: "/images/projects/top-level.png",
      slug: "blockchain-tld"
    },
    {
      title: "3D Blender Animation",
      description: "An animated short created using Blender, showcasing advanced rendering and storytelling techniques.",
      tags: ["Blender", "3D Animation", "Rendering"],
      githubUrl: "https://github.com/christophercelaya/3d-blender-animation",
      liveUrl: "https://",
      imageUrl: "/images/projects/blender.png",
      slug: "3d-blender-animation"
    },
    {
      title: "Unreal Engine 5 Game Environment",
      description: "A photorealistic game environment created with Unreal Engine 5, featuring Lumen and Nanite.",
      tags: ["Unreal Engine 5", "Blueprints", "Game Design"],
      githubUrl: "https://github.com/christophercelaya/ue5-environment",
      liveUrl: "https://",
      imageUrl: "/images/projects/unreal.png",
      slug: "ue5-game-environment"
    },
    {
      title: "Unity Game Environment",
      description: "An immersive 3D environment for Unity games, optimized for performance and interactivity.",
      tags: ["Unity", "C#", "Game Design"],
      githubUrl: "https://github.com/christophercelaya/unity-environment",
      liveUrl: "https://",
      imageUrl: "/images/projects/unity.png",
      slug: "unity-game-environment"
    },
    {
      title: "Amica Medical Doctor",
      description: "A comprehensive AI platform designed to assist medical practitioners with diagnostic and administrative tasks.",
      tags: ["Next.js", "AI", "OpenAI API"],
      githubUrl: "https://github.com/christophercelaya/amica-doctor",
      liveUrl: "https://",
      imageUrl: "/images/projects/amica.png",
      slug: "amica-medical-doctor"
    },
    {
      title: "Chattersync",
      description: "A multi-channel real-time chat application for teams, with AI-powered suggestions and insights.",
      tags: ["WebSocket", "React", "Node.js"],
      githubUrl: "https://github.com/christophercelaya/chattersync",
      liveUrl: "https://",
      imageUrl: "/images/projects/chattersync.jpg",
      slug: "chattersync"
    },
    {
      title: "Gemini Pro Vision",
      description: "A next-generation image processing tool with AI enhancements for photographers and videographers.",
      tags: ["Python", "OpenCV", "PyTorch"],
      githubUrl: "https://github.com/christophercelaya/gemini-pro-vision",
      liveUrl: "https://",
      imageUrl: "/images/projects/gemini-pro.jpg",
      slug: "gemini-pro-vision"
    },
    {
      title: "Replicate SDXL Image Generator",
      description: "A Stable Diffusion XL-powered platform for generating custom images and artwork.",
      tags: ["Stable Diffusion", "Replicate API", "Next.js"],
      githubUrl: "https://github.com/christophercelaya/replicate-sdxl",
      liveUrl: "https://",
      imageUrl: "/images/projects/replicate-sdxl.jpg",
      slug: "replicate-sdxl"
    },
    {
      title: "Ensemble",
      description: "A collaborative platform for musicians to create and share compositions.",
      tags: ["React", "Node.js", "Socket.IO"],
      githubUrl: "https://github.com/christophercelaya/ensemble",
      liveUrl: "https://",
      imageUrl: "/images/projects/ensemble.jpg",
      slug: "ensemble"
    },
    {
      title: "Natural Language Translator",
      description: "An AI-powered translator capable of understanding and translating natural language text with high accuracy.",
      tags: ["Transformers", "Hugging Face", "Next.js"],
      githubUrl: "https://github.com/christophercelaya/nl-translator",
      liveUrl: "https://ai-code-translator-pied-zeta.vercel.app",
      imageUrl: "/images/projects/nl-translator.jpg",
      slug: "natural-language-translator"
    },
    {
      title: "LangChain Agents",
      description: "Custom AI agents for advanced natural language understanding and task automation.",
      tags: ["LangChain", "Python", "OpenAI"],
      githubUrl: "https://github.com/christophercelaya/langchain-agents",
      liveUrl: "",
      imageUrl: "/images/projects/langchain.jpg",
      slug: "langchain-agents"
    },
    {
      title: "AI Assistant",
      description: "A personalized AI assistant designed for daily productivity tasks.",
      tags: ["Next.js", "LangChain", "OpenAI"],
      githubUrl: "https://github.com/christophercelaya/ai-assistant",
      liveUrl: "https://ai-assistant.com",
      imageUrl: "/images/projects/ai-assistant.jpg",
      slug: "ai-assistant"
    },
    {
      title: "Gemini Chat",
      description: "A conversational AI platform with multi-modal capabilities for enhanced user interaction.",
      tags: ["React", "LangChain", "OpenAI"],
      githubUrl: "https://github.com/christophercelaya/gemini-chat",
      liveUrl: "https://gemini-chat.com",
      imageUrl: "/images/projects/gemini-chat.jpg",
      slug: "gemini-chat"
    },
    {
      title: "Custom GPT",
      description: "A customizable GPT model fine-tuned for domain-specific applications.",
      tags: ["OpenAI", "Python", "LangChain"],
      githubUrl: "https://github.com/christophercelaya/custom-gpt",
      liveUrl: "https://custom-gpt.com",
      imageUrl: "/images/projects/custom-gpt.jpg",
      slug: "custom-gpt"
    },
    {
      title: "Groq Chat",
      description: "An AI chat platform built to offer super-fast inference using Groq hardware.",
      tags: ["Groq", "LangChain", "Python"],
      githubUrl: "https://github.com/christophercelaya/groq-chat",
      liveUrl: "https://groq-chat.com",
      imageUrl: "/images/projects/groq-chat.jpg",
      slug: "groq-chat"
    }
  ];
}