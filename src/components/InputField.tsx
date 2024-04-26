import React, { useState } from "react";
import { TextField, TextFieldProps, IconButton, InputAdornment, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  marginBottom?: number | string;
  error?: boolean;
  helperText?: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  marginBottom,
  error = false,
  helperText = "",
  type = "text",
  required = false,
  autoFocus = false,
  autoComplete = "off",
  showPasswordToggle = false
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const renderEndAdornment = () => {
    if (showPasswordToggle && type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      );
    }
    return null;
  };
  return (
    <Box mb={marginBottom}>
      <TextField
        type={type}
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        error={error}
        helperText={helperText}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        InputProps={{
          endAdornment: renderEndAdornment(),
        }}
      />
    </Box>
  );
};

export default InputField;
