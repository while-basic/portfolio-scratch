export const projectData = {
  midisaber: {
    title: "MidiSaber",
    description: "A unique music production tool leveraging motion-controlled MIDI interfaces.",
    introduction: "MidiSaber revolutionizes music production by combining motion sensing technology with MIDI control, creating an intuitive and expressive way to create music.",
    background: "Traditional MIDI controllers often lack the expressive capabilities that musicians desire. MidiSaber bridges this gap by translating physical movements into musical expression.",
    useCase: "Musicians and producers can use MidiSaber to control various aspects of their music production through intuitive motion controls, from filter sweeps to note triggers.",
    inspiration: "The project was inspired by the natural movements of conductors and the desire to bring that level of physical expression to electronic music production.",
    projectDetails: {
      duration: "8 months",
      role: "Full Stack Developer",
      team: "3 developers, 2 sound designers",
      stakeholders: ["Musicians", "Music Producers", "Live Performers"]
    },
    technologyStack: {
      "Hardware": ["Arduino", "MPU-6050 Sensors", "Custom PCB"],
      "Firmware": ["C++", "Arduino Framework"],
      "Software": ["Node.js", "Electron", "Web MIDI API"],
      "Audio": ["MIDI Protocol", "VST Integration"],
      "Interface": ["React", "WebGL"]
    },
    developmentProcess: [
      "Initial hardware prototyping",
      "Sensor calibration and testing",
      "MIDI protocol implementation",
      "Software interface development",
      "User testing with musicians",
      "Performance optimization"
    ],
    features: [
      "Motion-to-MIDI conversion",
      "Real-time parameter control",
      "Custom gesture mapping",
      "Low-latency performance",
      "DAW integration"
    ],
    benefits: [
      "Intuitive musical expression",
      "Enhanced live performance capabilities",
      "Customizable control schemes",
      "Reduced learning curve",
      "Unique creative possibilities"
    ],
    challenges: [
      "Minimizing latency",
      "Accurate motion detection",
      "Cross-platform compatibility",
      "Power management"
    ],
    futurePlans: [
      "Wireless connectivity",
      "Extended gesture recognition",
      "Mobile app integration",
      "Machine learning for gesture prediction"
    ],
    conclusion: "MidiSaber represents a significant step forward in music production interfaces, offering musicians and producers a new way to interact with their instruments and software."
  }
};
