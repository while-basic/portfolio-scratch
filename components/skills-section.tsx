const skills = [
  { category: 'Mechatronics', items: ['PLC Programming', 'Robotics', 'Sensor Integration', 'CAD/CAM', 'Industrial Automation'] },
  { category: 'Software Development', items: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'] },
  { category: 'Audio Engineering', items: ['Pro Tools', 'Ableton Live', 'Acoustic Design', 'Signal Processing', 'Mixing & Mastering'] }
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

