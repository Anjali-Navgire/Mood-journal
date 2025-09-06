import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    let [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://mood-journal-npfg.onrender.com/api/auth/signup", form);
            console.log("Axios response:", res);
            alert("Signup Successfully");
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (err) {
            alert(err.response.data.message || "Signup failed");
        }
    };

   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 animate-gradient-xy">
      {/* Highlighted Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-neutral-900/95 backdrop-blur-md shadow-2xl border border-white/10 animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-wide">
          Mood Journal ✨
        </h2>
        <p className="text-center text-gray-300 mb-8 text-sm">
          Balance your thoughts, embrace your mood 💭
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
            <span className="absolute right-3 top-3 text-pink-400">🌸</span>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 accent-pink-500"
            />
            <label>Show Password</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white font-semibold tracking-wide shadow-lg hover:shadow-pink-500/30 hover:scale-[1.04] transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-400 font-semibold hover:underline hover:text-pink-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
