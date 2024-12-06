import { FC } from 'react'

const AboutPage: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-black rounded-lg shadow-md border border-zinc-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-8">About</h2>
        
        {/* Work and Education */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Work and Education</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-zinc-900 rounded-lg flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Works at Tech Company</p>
                <p className="text-gray-400">2020 - Present</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-zinc-900 rounded-lg flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Studied at University</p>
                <p className="text-gray-400">2016 - 2020</p>
              </div>
            </div>
          </div>
        </section>

        {/* Places Lived */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Places Lived</h3>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Lives in City, Country</p>
              <p className="text-gray-400">Current City</p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
          <div className="space-y-3">
            <p className="text-gray-300">📧 email@example.com</p>
            <p className="text-gray-300">🌐 website.com</p>
          </div>
        </section>

        {/* Basic Info */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Basic Info</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Gender:</span>
              <span className="text-white">Male</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Birthday:</span>
              <span className="text-white">January 1, 1990</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Languages:</span>
              <span className="text-white">English, Spanish</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage 