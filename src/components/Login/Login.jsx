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
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4" style={{ padding: "2rem", marginTop: "80px" }}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
  >
    <h2 className="text-3xl font-bold text-center text-pink-600">Welcome Back 💖</h2>

    <div>
      <label className="block mb-1 text-sm text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        required
        placeholder="e.g. jane@example.com"
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        required
        placeholder="••••••"
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition duration-200"
    >
      Log In
    </button>

    {message && (
      <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
    )}
  </form>
</div>

      {/* Demo user viewer */}
      <div className="bg-white shadow p-6 rounded-xl w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2 text-pink-700" style={{ padding: "2rem", marginTop: "300px" }}>👥 Test Users</h3>
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