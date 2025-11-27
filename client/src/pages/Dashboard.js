import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FadeIn from "../components/animations/FadeIn";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <FadeIn>
      <div className="text-center mt-5">
        <h1 className="fw-bold">🎉 Welcome to LinguaAI</h1>
        <p className="text-muted fs-5">Your personalized learning dashboard.</p>

        <div className="mt-4">
          <Button
            variant="primary"
            className="btn-animated me-3"
            onClick={() => navigate("/lessons")}
          >
            Start Learning
          </Button>

          <Button
            variant="danger"
            className="btn-animated"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </FadeIn>
  );
}
