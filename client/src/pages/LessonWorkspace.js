import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import api from "../api/api";

export default function LessonWorkspace() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const loadWorkspace = async () => {
    try {
      const res = await api.get(`/lessons/${id}/workspace`);
      setLesson(res.data);
    } catch (err) {
      console.error("Error loading workspace:", err.message);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await api.get(`/lessons/${id}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err.message);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await api.post(`/lessons/${id}/chat`, { query: input });

      setHistory((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Chat error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace();
    loadHistory();
  }, [id]);

  if (!lesson) return <p>Loading workspace...</p>;

  return (
    <div className="mt-4 fade-in">
      <h2>📘 {lesson.title} — Workspace</h2>
      <p><strong>Language:</strong> {lesson.language}</p>

      {/* Ask AI */}
      <Card className="p-3 mt-3">
        <Form.Control
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this language..."
        />
        <Button
          className="mt-3 btn-primary w-100"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </Button>
      </Card>

      {/* History */}
      <h3 className="mt-4">🧠 My Learnings</h3>
      {history.length === 0 && <p>No learning history yet.</p>}

      {history.map((item, i) => (
        <Card key={i} className="p-3 mt-3">
          <p><strong>You:</strong> {item.question}</p>
          <p><strong>🤖 AI:</strong> {item.response}</p>
        </Card>
      ))}
    </div>
  );
}
