'use client'

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { getProfile, updateProfile, uploadProfileImage, type ProfileWithStringSkills } from "@/lib/profiles"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import {
  User,
  Loader2
} from "lucide-react"

function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [profile, setProfile] = useState<Partial<ProfileWithStringSkills>>({
    id: "",
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    occupation: "",
    bio: "",
    website: "",
    avatar_url: "",
    cover_image: "",
    github: "",
    twitter: "",
    linkedin: "",
    skills: "",
    created_at: "",
    updated_at: "",
  })

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return
      setIsLoading(true)
      try {
        const data = await getProfile()
        if (data) {
          setProfile(data)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast({
          title: "Error",
          description: "Failed to load profile. Please try refreshing the page.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [user?.id, toast])

  const handleSave = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)
    try {
      // Handle avatar upload if there's a new file
      let avatarUrl = profile.avatar_url
      if (avatarFile) {
        const { url, error: uploadError } = await uploadProfileImage(avatarFile, 'avatars', user.id)
        if (uploadError) {
          throw uploadError
        }
        if (url) avatarUrl = url
      }

      // Handle cover image upload if there's a new file
      let coverImageUrl = profile.cover_image
      if (coverImageFile) {
        const { url, error: uploadError } = await uploadProfileImage(coverImageFile, 'covers', user.id)
        if (uploadError) {
          throw uploadError
        }
        if (url) coverImageUrl = url
      }

      // Prepare skills array
      const skillsArray = profile.skills
        ? typeof profile.skills === 'string'
          ? profile.skills.split(',').map(skill => skill.trim())
          : []
        : []

      // Update profile
      const updatedProfile = await updateProfile({
        ...profile,
        avatar_url: avatarUrl,
        cover_image: coverImageUrl,
        skills: skillsArray.join(', '),
      })

      if (updatedProfile) {
        setProfile(updatedProfile)
        toast({
          title: "Success",
          description: "Profile updated successfully"
        })
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (
    file: File,
    type: 'avatars' | 'covers',
    updateField: 'avatar_url' | 'cover_image'
  ) => {
    if (!user?.id) return

    try {
      const { url, error } = await uploadProfileImage(file, type, user.id)
      if (error) throw error
      
      if (url) {
        setProfile(prev => ({
          ...prev,
          [updateField]: url
        }))
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to upload ${type}`,
        variant: "destructive"
      })
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatars' | 'covers') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (type === 'avatars') {
      setAvatarFile(file)
      await handleImageUpload(file, type, 'avatar_url')
    } else {
      setCoverImageFile(file)
      await handleImageUpload(file, type, 'cover_image')
    }
  }

  if (!user?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl py-8 space-y-8">
        <Card className="p-6">
          <div className="space-y-8">
            {/* Cover Image */}
            <div className="relative h-48 -mx-6 -mt-6 bg-muted">
              {profile.cover_image ? (
                <Image
                  src={profile.cover_image}
                  alt="Cover"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Button
                    variant="ghost"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                  >
                    Update Cover
                  </Button>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'covers')}
                  />
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24">
                  {profile.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="rounded-full object-cover"
                      fill
                      sizes="96px"
                      priority
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'avatars')}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  Change Photo
                </Button>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.first_name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.last_name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, last_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={profile.occupation || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, occupation: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, website: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={profile.github || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={profile.twitter || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, twitter: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedin: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    placeholder="React, TypeScript, Next.js..."
                    value={profile.skills || ''}
                    onChange={(e) => {
                      setProfile(prev => ({ ...prev, skills: e.target.value }))
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate skills with commas
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

export default ProfilePage
