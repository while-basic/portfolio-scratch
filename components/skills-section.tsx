const skills = [
  { 
    category: 'Software Development', 
    items: [
      'Python', 'Javascript', 'Java', 'C', 'C#',
      'HTML', 'CSS', 'React', 'Node.js',
      'SQL', 'MongoDB', 'PostgreSQL',
      'Google Cloud', 'Azure',
      'Docker', 'Git'
    ] 
  },
  { 
    category: 'Industrial & Mechatronics', 
    items: [
      'PLC Programming',
      'Electrical Systems',
      'Preventative Maintenance',
      'Industrial Manufacturing',
      'Project Management',
      'Product Design and Prototyping',
      'Problem-solving',
      'Cross-Disciplinary Knowledge'
    ] 
  },
  { 
    category: 'Certifications & Languages', 
    items: [
      'NFPA 70E - Electrical Safety',
      'OSHA 10 - Construction Safety',
      'English (Native)',
      'Spanish (Beginner)'
    ] 
  }
]

export function SkillsSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillSet, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">{skillSet.category}</h3>
              <ul className="list-disc list-inside">
                {skillSet.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="mb-2">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
