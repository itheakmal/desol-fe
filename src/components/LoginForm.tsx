import React, { useState, FormEvent } from 'react';
import { Typography } from '@mui/material';
import InputField from './InputField';
import LoginButton from './LoginButton';
import { validateEmail, validatePassword } from '../utils/validation';
import { useRouter } from 'next/router';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
    const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    // const isEmailValid = true
    // const isPasswordValid = true
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!email.trim() || !password.trim()) {
      setEmailError('Email and password are required');
      setPasswordError('Email and password are required');
      return;
    }

    if (!isEmailValid) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }

    if (!isPasswordValid) {
      setPasswordError('Password must be alpha numeric and at least 8 characters');
    } else {
      setPasswordError('');
    }

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setError('');

    try {
      await onSubmit(email.trim(), password.trim());
    //   window.history.pushState({}, '', '/submission');
      
    } catch (error) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        marginBottom={1}
        error={!!emailError}
        helperText={emailError}
        autoFocus
        required
      />
      <InputField
        // type="password"
        label="Password"
        value={password}
        type={showPassword ? 'text' : 'password'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        required
        // autoComplete="new-password"
        // showPasswordToggle
      />
      {error && <Typography color="error">{error}</Typography>}
      <LoginButton loading={loading} onClick={handleSubmit} label="Login" />
    </form>
  );
};

export default LoginForm;
