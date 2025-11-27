import { useState } from "react";
import api from "../api/api";
import { Card, Button, Form, Alert } from "react-bootstrap";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg]   = useState("");
  const [variant, setVariant] = useState("danger");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      setVariant("success");
      setMsg("Account created 🎉 You can now login.");
    } catch (err) {
      setVariant("danger");
      setMsg(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <Card className="mx-auto mt-5 p-4 shadow-lg hover-card fade-in" style={{ maxWidth: 420 }}>
      <h3 className="text-center mb-3">Create Account</h3>

      {msg && <Alert variant={variant}>{msg}</Alert>}

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e)=>setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </Form.Group>

        <Button className="w-100 btn-animated" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Card>
  );
}
