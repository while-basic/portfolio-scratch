import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Input, Notification } from 'shadcn';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setNotification(error.message);
    else setNotification('Sign-up successful! Please check your email.');
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setNotification(error.message);
    else setNotification('Sign-in successful!');
  };

  return (
    <div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp}>Sign Up</Button>
      <Button onClick={handleSignIn}>Sign In</Button>
      {notification && <Notification>{notification}</Notification>}
    </div>
  );
};

export default Auth;
