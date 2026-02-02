import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body text-center">
          <h3>Welcome to Dashboard</h3>
          <p>You are successfully logged in.</p>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
