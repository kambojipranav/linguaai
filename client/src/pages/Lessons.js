import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import api from "../api/api";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/lessons");
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to fetch lessons", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!title || !language) return;

    try {
      setSaving(true);
      const res = await api.post("/lessons", {
        title,
        language,
        level,
        description,
      });
      setLessons((prev) => [res.data, ...prev]);
      setTitle("");
      setLanguage("");
      setLevel("Beginner");
      setDescription("");
    } catch (err) {
      console.error("Failed to add lesson", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("Delete this lesson?")) return;

    try {
      await api.delete(`/lessons/${id}`);
      setLessons((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Failed to delete lesson", err);
    }
  };

  return (
    <div className="mt-4 fade-in">
      <h2 className="mb-3">Your Lessons</h2>
      <p className="text-muted">
        Create language lessons to start practicing. You can add, view, and delete them anytime.
      </p>

      {/* Add Lesson Form */}
      <Card className="mb-4 hover-card p-3">
        <Form onSubmit={handleAddLesson}>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Basics of Spanish"
                required
              />
            </Col>

            <Col md={3} className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Spanish"
                required
              />
            </Col>

            <Col md={2} className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Form.Select>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description (optional)"
              />
            </Col>
          </Row>

          <Button
            type="submit"
            className="btn-animated"
            disabled={saving}
          >
            {saving ? "Saving..." : "Add Lesson"}
          </Button>
        </Form>
      </Card>

      {/* Lessons List */}
      {loading ? (
        <p>Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p className="text-muted">No lessons yet. Add your first lesson above!</p>
      ) : (
        <Row>
          {lessons.map((lesson) => (
            <Col key={lesson._id} md={4} className="mb-3">
              <Card className="hover-card h-100">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span>{lesson.title}</span>
                    <Badge bg="secondary">{lesson.level}</Badge>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {lesson.language}
                  </Card.Subtitle>
                  <Card.Text>
                    {lesson.description || "No description"}
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="btn-animated"
                    onClick={() => handleDeleteLesson(lesson._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
