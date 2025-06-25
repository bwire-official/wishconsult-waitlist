'use server'

import { createClient } from '@supabase/supabase-js'

// Note: We use the standard supabase-js client here, not the SSR version,
// because this is a simple, separate application.

export async function addToWaitlist(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  // These should be stored as environment variables in Vercel
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // First, check if the email already exists and get their position
  const { data: existingUser } = await supabase
    .from('waitlist')
    .select('id, created_at')
    .eq('email', email)
    .single();

  if (existingUser) {
    // Get their position in the waitlist by counting how many people joined before them
    const { count: position } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lt('created_at', existingUser.created_at);

    return { 
      success: true, 
      message: 'You are already on the list!', 
      isDuplicate: true,
      position: (position || 0) + 1
    };
  }

  // Insert new email
  const { error } = await supabase.from('waitlist').insert({ email });

  if (error) {
    console.error('Waitlist Error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }

  // Get their position in the waitlist by counting total entries
  const { count: position } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  return { 
    success: true, 
    message: `Success! We've added ${email} to the list.`,
    isDuplicate: false,
    position: position || 1
  };
} 