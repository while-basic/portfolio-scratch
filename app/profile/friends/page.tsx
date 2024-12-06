import { FC } from 'react'
import Image from 'next/image'

const FriendsPage: FC = () => {
  const friends = Array(12).fill({
    name: 'Friend Name',
    mutualFriends: '5 mutual friends',
    avatar: '/default-avatar.jpg'
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-black rounded-lg shadow-md border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Friends</h2>
          <input
            type="text"
            placeholder="Search Friends"
            className="bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">{friend.name}</h3>
                <p className="text-gray-400 text-sm">{friend.mutualFriends}</p>
                <button className="mt-2 text-sm text-gray-300 hover:text-white">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendsPage 