import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-5 fade-in">
      <h1 className="fw-bold display-4">
        Master Languages with AI 🤖✨
      </h1>

      <p className="fs-5 mt-3 text-muted">
        Personalized lessons, speaking practice, real-time feedback & gamified learning.
      </p>

      <div className="mt-4">
        <Button as={Link} to="/register" size="lg" className="btn-animated me-3">
          Start Learning 🚀
        </Button>

        <Button as={Link} to="/login" size="lg" variant="outline-primary" className="btn-animated">
          Login
        </Button>
      </div>
    </div>
  );
}
