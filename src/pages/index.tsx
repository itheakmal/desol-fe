import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";
import { login } from "../services/networkRequests";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      if (response.token) {
        await localStorage.setItem("token", response.token);
        router.push("/submission");
        console.log("Login successful");
      } else {
        throw new Error(response.error || "Failed to login. Please try again.");
      }
    } catch (error: any) {
      setError(error.error || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // This makes the Box take the full viewport height
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm onSubmit={handleLogin} loading={loading} />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default LoginPage;
