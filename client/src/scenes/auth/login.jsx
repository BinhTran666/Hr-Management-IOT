import React, { useEffect, useState } from "react";
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
import { LockOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "slice/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Nếu người dùng đã đăng nhập, chuyển hướng về Dashboard
  useEffect(() => {
    // Gửi yêu cầu kiểm tra token từ cookies
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth/check-auth`, {
        withCredentials: true,
      })
      .then((response) => {
        // Nếu xác thực thành công, chuyển hướng đến dashboard
        console.log("User authenticated", response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Nếu có lỗi (chẳng hạn token không hợp lệ), tiếp tục ở trang login
        console.log("Not authenticated", error);
      });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { user } = response.data;

      // Dispatch Redux Action
      dispatch(login(user));
      console.log(user);

      // Chuyển hướng tới Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
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
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          fontWeight="bold"
        >
          SIGN IN
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            placeholder="Enter Password"
            type="password"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Link href="/forgot-password" underline="hover">
            {"forgot password?"}
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
            </Typography>
            <Link href="/signup" underline="hover">
              {"Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
