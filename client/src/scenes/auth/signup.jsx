import React, { useState } from "react";
import { useColorScheme } from "@mui/joy/styles";
import {
  Paper,
  Container,
  Avatar,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Button,
  Link,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        { email, password, name },
        { withCredentials: true }
      );

      // const { user } = response.data;

      // // Dispatch Redux Action
      // dispatch(login(user));
      // console.log(user);

      // Chuyển hướng tới Dashboard
      navigate("/signin");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
    console.log("Login");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={16} sx={{ padding: 4, marginTop: 10 }}>
        <Avatar
          sx={{
            margin: "auto",
            backgroundColor: "primary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <PersonAdd />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          fontWeight="bold"
        >
          SIGN IN
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter email address"
            type="email"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            placeholder="Enter user name"
            type="text"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            placeholder="Enter Password"
            type="password"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            placeholder="Comfirm Password"
            type="password"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
            </Typography>
            <Link href="/signin" underline="hover">
              {"Sign In"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
