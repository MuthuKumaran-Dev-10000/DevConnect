import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/register", { name, email, password, role });
      alert("Signup Successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message); // Log the actual error
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="title">TCE Classroom</h1>
        <h2>Signup</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button onClick={handleSignup}>Register</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
