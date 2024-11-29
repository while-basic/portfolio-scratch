export function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white pt-20">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 opacity-50"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}
      />
      <div className="relative container mx-auto px-6 pt-32 text-center">
        <h1 className="text-5xl font-bold mb-4">Christopher Celaya</h1>
        <p className="text-xl mb-8">Mechatronics Technician | Software Developer | Audio Engineer</p>
        <p className="text-lg max-w-2xl mx-auto text-gray-200">
          Combining expertise in mechanical systems, software development, and 
          audio engineering to create innovative solutions at the intersection of 
          technology and sound.
        </p>
      </div>
    </section>
  )
}
