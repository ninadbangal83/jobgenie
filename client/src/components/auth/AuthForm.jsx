// src/components/auth/AuthForm.js
import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthForm = ({ isLogin: initialLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`
        : `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`;

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(url, payload);
      if (isLogin) {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
        navigate("/home");
      } else {
        alert("Registration successful. Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert("Auth failed: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              required
              value={form.name}
              onChange={handleChange}
              margin="normal"
            />
          )}
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, borderRadius: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <Divider sx={{ my: 3 }} />

        <Typography align="center">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <Link href={isLogin ? "/register" : "/login"} underline="hover">
            {isLogin ? "Register" : "Login"}
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthForm;
