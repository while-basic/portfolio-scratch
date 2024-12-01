import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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
  const supabase = createClientComponentClient()

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

  if (error) {
    console.error('Error creating conversation:', error)
    throw error
  }
  return data
}

export async function updateConversation(id: string, messages: Message[]) {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('conversations')
    .update({
      messages,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating conversation:', error)
    throw error
  }
  return data
}

export async function getConversations(userId: string) {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error getting conversations:', error)
    throw error
  }
  return data || []
}

export async function deleteConversation(id: string) {
  const supabase = createClientComponentClient()

  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting conversation:', error)
    throw error
  }
}
