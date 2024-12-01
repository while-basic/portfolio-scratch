import { createClient } from '@/lib/supabase/client'
import { Message } from '@/components/chat/message-list'

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  user_id: string
  created_at: string
  updated_at: string
}

export async function createConversation(userId: string, title: string, messages: Message[]) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .insert([
      {
        title,
        messages,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateConversation(id: string, messages: Message[]) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .update({
      messages,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getConversations(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export async function deleteConversation(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', id)

  if (error) throw error
}
