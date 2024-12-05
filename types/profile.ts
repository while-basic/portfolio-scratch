export type Profile = {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  location: string | null
  occupation: string | null
  bio: string | null
  website: string | null
  avatar_url: string | null
  cover_image: string | null
  github: string | null
  twitter: string | null
  linkedin: string | null
  skills: string[]
  created_at: string
  updated_at: string
}
