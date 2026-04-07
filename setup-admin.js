// setup-admin.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin operations

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAdmin() {
  console.log('Creating admin user...');
  
  // Admin credentials
  const adminEmail = 'admin@psl.com';
  const adminPassword = 'Admin@123';  // ← THIS IS THE PASSWORD
  
  // 1. Create user
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: {
      name: 'Admin User',
      phone: '1234567890',
      role: 'admin'
    }
  });
  
  if (userError) {
    console.error('Error creating admin:', userError);
    return;
  }
  
  console.log('✅ Admin user created!');
  console.log('📧 Email:', adminEmail);
  console.log('🔑 Password:', adminPassword);
  console.log('🆔 User ID:', userData.user.id);
  
  // 2. Update role in public.users table
  const { error: updateError } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('id', userData.user.id);
  
  if (updateError) {
    console.error('Error updating role:', updateError);
  } else {
    console.log('✅ Admin role assigned!');
  }
  
  // 3. Test login
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword
  });
  
  if (loginError) {
    console.error('Login test failed:', loginError);
  } else {
    console.log('✅ Login test successful!');
    console.log('Session created for:', loginData.user.email);
  }
}

setupAdmin();
