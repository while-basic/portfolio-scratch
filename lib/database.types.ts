export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          email: string | null
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
          skills: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          occupation?: string | null
          bio?: string | null
          website?: string | null
          avatar_url?: string | null
          cover_image?: string | null
          github?: string | null
          twitter?: string | null
          linkedin?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          occupation?: string | null
          bio?: string | null
          website?: string | null
          avatar_url?: string | null
          cover_image?: string | null
          github?: string | null
          twitter?: string | null
          linkedin?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
