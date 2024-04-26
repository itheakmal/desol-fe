import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface LoginButtonProps {
  loading: boolean;
  onClick: (e?: React.FormEvent) => Promise<void>;
  label: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ loading, onClick, label }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={loading}
      onClick={(e) => onClick(e)}
      style={{ marginTop: '1rem' }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
};

export default LoginButton;
