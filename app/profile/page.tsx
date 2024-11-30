"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Link as LinkIcon,
  Loader2,
} from "lucide-react"
import { getProfile, updateProfile, createProfile } from "@/lib/profiles"
import type { Profile } from "@/types/profile"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<Partial<Profile>>({
    first_name: "",
    last_name: "",
    email: user?.email || "",
    phone: "",
    location: "",
    occupation: "",
    bio: "",
    website: "",
    avatar_url: "",
  })

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return
      
      try {
        const data = await getProfile(user.id)
        if (data) {
          setProfile(data)
        }
      } catch (error: unknown) {
        console.error("Error loading profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user?.id, toast])

  const handleSave = async () => {
    if (!user?.id) return

    setIsSaving(true)
    try {
      const result = await (profile.id
        ? updateProfile(user.id, profile)
        : createProfile(user.id, profile))

      if (!result.success && result.error) {
        throw new Error(result.error)
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      setIsEditing(false)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
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
      <div className="container max-w-4xl py-8">
        <Card className="p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-primary/10">
                <AvatarImage src={profile.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1920&auto=format&fit=crop"} />
                <AvatarFallback>
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="text-sm">
                Pro Member
              </Badge>
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  <p className="text-muted-foreground flex items-center mt-1">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {profile.occupation || "Add your occupation"}
                  </p>
                  <p className="text-muted-foreground flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    {profile.location || "Add your location"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {profile.bio || "Add your bio"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2" />
                      {profile.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      {profile.phone || "Add your phone"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      <a
                        href={profile.website || "#"}
                        className="text-primary hover:underline"
                      >
                        {profile.website || "Add your website"}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Joined {new Date(profile.created_at || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              {isEditing && (
                <div className="mt-6 space-y-4 border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={profile.first_name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, first_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={profile.last_name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, last_name: e.target.value })
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
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.website || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, website: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profile.bio || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
