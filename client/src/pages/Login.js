import { useState } from "react";
import api from "../api/api";
import { Card, Button, Form, Alert } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ we expect backend to send { token, user: { ... } }
      const { token, user } = res.data;

      if (!token || !user) {
        setVariant("danger");
        setMsg("Invalid response from server");
        return;
      }

      setVariant("success");
      setMsg("Login Successful 🎉 Redirecting...");

      // Save token + user in context + localStorage
      login(token, user);

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setVariant("danger");
      setMsg(err.response?.data?.message || "Login failed ");
    }
  };

  return (
    <Card className="mx-auto mt-5 p-4 shadow-lg hover-card fade-in" style={{ maxWidth: 420 }}>
      <h3 className="text-center mb-3">Login</h3>

      {msg && <Alert variant={variant}>{msg}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100 btn-animated" variant="success">
          Login
        </Button>
      </Form>

      <p className="text-center mt-3 text-muted" style={{ fontSize: "14px" }}>
        Don't have an account? <a href="/register">Create one</a>
      </p>
    </Card>
  );
}
