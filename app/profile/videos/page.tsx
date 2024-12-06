import { FC } from 'react'

const VideosPage: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-black rounded-lg shadow-md border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Videos</h2>
          <div className="flex gap-4">
            <select className="bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-700">
              <option>Most Recent</option>
              <option>Most Viewed</option>
            </select>
            <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800">
              Upload Video
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(null).map((_, index) => (
            <div key={index} className="group">
              <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-3 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 group-hover:text-gray-400">▶️</span>
                </div>
              </div>
              <h3 className="text-white font-medium mb-1">Video Title {index + 1}</h3>
              <p className="text-gray-400 text-sm">1.2K views • 2 days ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideosPage 