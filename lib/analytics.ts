import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function trackPageView(path: string) {
  try {
    const supabase = createClientComponentClient()
    
    // First try to update existing record for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { data: existingView } = await supabase
      .from('page_views')
      .select('*')
      .eq('path', path)
      .gte('created_at', today.toISOString())
      .lte('created_at', new Date().toISOString())
      .single()

    if (existingView) {
      // Update existing record
      await supabase
        .from('page_views')
        .update({ count: existingView.count + 1 })
        .eq('id', existingView.id)
    } else {
      // Create new record
      await supabase
        .from('page_views')
        .insert({
          path,
          count: 1,
          created_at: new Date().toISOString()
        })
    }
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}
