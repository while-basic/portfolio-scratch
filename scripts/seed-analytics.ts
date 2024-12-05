import { createClient } from '@/lib/supabase/client';

async function seedAnalytics() {
  const supabase = createClient();

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('No user found. Please log in first.');
    return;
  }

  // Generate data for the last 6 months
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  for (let date = startDate; date <= new Date(); date.setDate(date.getDate() + 1)) {
    const userCount = Math.floor(Math.random() * 100) + 50; // Random number between 50-150
    const taskCount = Math.floor(Math.random() * 200) + 100; // Random number between 100-300
    const eventCount = Math.floor(Math.random() * 50) + 20; // Random number between 20-70

    try {
      const { error } = await supabase
        .from('analytics')
        .upsert({
          user_id: user.id,
          date: date.toISOString().split('T')[0],
          user_count: userCount,
          task_count: taskCount,
          event_count: eventCount,
        });

      if (error) throw error;
      console.log(`Seeded analytics for ${date.toISOString().split('T')[0]}`);
    } catch (error) {
      console.error('Error seeding analytics:', error);
    }
  }

  console.log('Analytics seeding completed!');
}

seedAnalytics().catch(console.error);
