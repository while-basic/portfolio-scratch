import { FC } from 'react'

const PhotosPage: FC = () => {
  const albums = [
    { name: 'Profile Pictures', count: 15 },
    { name: 'Cover Photos', count: 8 },
    { name: 'Timeline Photos', count: 24 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Albums Section */}
      <div className="bg-black rounded-lg shadow-md border border-zinc-800 p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-square bg-zinc-900 rounded-lg overflow-hidden mb-2">
                <div className="w-full h-full flex items-center justify-center text-gray-500 group-hover:text-gray-400">
                  {album.count} photos
                </div>
              </div>
              <h3 className="text-white font-medium">{album.name}</h3>
              <p className="text-gray-400 text-sm">{album.count} items</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Photos Grid */}
      <div className="bg-black rounded-lg shadow-md border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">All Photos</h2>
          <select className="bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-700">
            <option>Most Recent</option>
            <option>Oldest</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(16).fill(null).map((_, index) => (
            <div key={index} className="aspect-square bg-zinc-900 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Photo {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhotosPage 