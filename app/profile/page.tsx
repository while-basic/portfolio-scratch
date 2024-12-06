import { FC } from 'react'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileContent from '@/components/profile/profile-content'

const ProfilePage: FC = () => {
  return (
    <main className="min-h-screen bg-black">
      <ProfileHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileContent />
      </div>
    </main>
  )
}

export default ProfilePage
