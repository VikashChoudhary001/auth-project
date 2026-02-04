import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await registerUser(formData);

    if (data?.status === "success") {
      alert(data.message || "Registration successful");
      navigate("/"); // login page
    } else {
      alert(data?.message || "Registration failed");
    }

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-success w-100">
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
