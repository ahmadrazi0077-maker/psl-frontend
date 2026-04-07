// Run this in your React app or Node.js script
import { supabase } from './src/lib/supabase';

const createAdminUser = async () => {
  // 1. Sign up the user
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: 'admin@psl.com',
    password: 'Admin@123',  // ← THIS IS THE PASSWORD
    options: {
      data: {
        name: 'Admin User',
        phone: '1234567890',
        role: 'admin'
      }
    }
  });

  if (signUpError) {
    console.error('Error creating user:', signUpError);
    return;
  }

  console.log('User created:', authData);

  // 2. Update the user's role in your public users table
  const { error: updateError } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('id', authData.user.id);

  if (updateError) {
    console.error('Error updating role:', updateError);
  } else {
    console.log('Admin user created successfully!');
    console.log('Email: admin@psl.com');
    console.log('Password: Admin@123');
  }
};

createAdminUser();
