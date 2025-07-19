import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users for testing/demo
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/auth/test")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful!");
      navigate("/newproduct"); 
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md space-y-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-pink-600 text-center">Login</h2>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded"
        >
          Log In
        </button>

        {message && <p className="text-center text-gray-600">{message}</p>}
      </form>

      {/* Demo user viewer */}
      <div className="bg-white shadow p-6 rounded-xl w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2 text-pink-700">👥 Test Users</h3>
        {users.length > 0 ? (
          <ul className="space-y-2 text-sm text-gray-700">
            {users.map((user, idx) => (
              <li key={idx} className="border p-2 rounded bg-gray-50">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {user.password}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Login;