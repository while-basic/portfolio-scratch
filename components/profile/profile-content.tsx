import { FC } from 'react'

const ProfileContent: FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
      {/* Left Column - Info */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-black rounded-lg shadow-md border border-zinc-800">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Intro</h2>
            <div className="space-y-3">
              <p className="text-gray-300 flex items-center gap-2">
                <span className="text-gray-500">🏢</span> Works at Tech Company
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <span className="text-gray-500">🎓</span> Studied at University
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <span className="text-gray-500">📍</span> Lives in City, Country
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <span className="text-gray-500">💑</span> Single
              </p>
              <button className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-800 rounded-md font-medium text-white transition-colors">
                Edit Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Photos Section */}
        <div className="bg-black rounded-lg shadow-md border border-zinc-800">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Photos</h2>
              <button className="text-white hover:text-gray-300 font-medium">See All</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-zinc-900 rounded-md hover:opacity-75 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Posts */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <div className="bg-black rounded-lg shadow-md border border-zinc-800">
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-zinc-900 flex-shrink-0" />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 rounded-full bg-zinc-900 hover:bg-zinc-800 px-4 py-2 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500"
              />
            </div>
            <div className="border-t border-zinc-800 mt-4 pt-4">
              <div className="flex justify-between">
                <button className="flex items-center space-x-2 text-gray-300 hover:bg-zinc-900 px-4 py-2 rounded-lg transition-colors">
                  <span>📷 Photo/Video</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-300 hover:bg-zinc-900 px-4 py-2 rounded-lg transition-colors">
                  <span>😊 Feeling/Activity</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Post */}
        <div className="bg-black rounded-lg shadow-md border border-zinc-800">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-zinc-900 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">John Doe</p>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">This is a sample post content!</p>
          </div>
          <div className="border-t border-zinc-800 px-4 py-3">
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 text-gray-300 hover:bg-zinc-900 py-1 rounded-md transition-colors">
                <span>👍 Like</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 text-gray-300 hover:bg-zinc-900 py-1 rounded-md transition-colors">
                <span>💬 Comment</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 text-gray-300 hover:bg-zinc-900 py-1 rounded-md transition-colors">
                <span>↗️ Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent 