import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { isAuthenticated } from "../utils/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/UserRoleSelection");
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      alert("Google Login successful!");
      navigate("/UserRoleSelection");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Try again.");
    }
  };


  const handleLogin = () => {
    if (username && password) {
      const fakeUser = {
        name: username,
        email: username.includes("@") ? username : `${username}@example.com`,
        photoURL: "/default-user.png", // or any default image
      };

      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("isLoggedIn", "true");

      alert("Fake login successful!");
      navigate("/UserRoleSelection");
    } else {
      setError("Please enter both username and password.");
    }
  };


 /* const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const backendURL =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

      const response = await fetch(`${backendURL}/api/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful!");
      navigate("/Dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };*/

  const handleRegisterRedirect = () => navigate("/signin");

  return (
    <section className="bg-gray-900 min-h-screen flex justify-center items-center text-white">
      <div className="bg-gray-800 rounded-2xl flex max-w-3xl p-5 items-center shadow-2xl">
        <div className="md:w-1/2 px-8">
          <div className="text-3xl font-bold text-white">
            Talent<span className="text-indigo-400">Traveler</span>
          </div>
          <p className="text-sm mt-4 text-gray-300">
            Connect. Collaborate. Create.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 mt-8 rounded-xl border bg-gray-700 text-white"
              placeholder="Email or Username"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-xl border w-full bg-gray-700 text-white"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-violet-600 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-violet-700 font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6">
            <hr className="border-gray-600" />
            <p className="text-center text-sm text-gray-400">OR</p>
            <hr className="border-gray-600" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm text-black hover:scale-105 duration-300 hover:bg-gray-200 font-medium"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login with Google
          </button>

          <div className="mt-10 text-sm border-b border-gray-700 py-5">
            <a href="#" className="text-gray-400">
              Forgot password?
            </a>
          </div>

          <div className="mt-4 text-sm flex justify-between items-center">
            <p className="mr-3 text-gray-400">Don’t have an account?</p>
            <button
              onClick={handleRegisterRedirect}
              className="bg-violet-600 hover:bg-violet-700 rounded-xl py-2 px-5 hover:scale-110 text-white duration-300"
            >
              Register
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="/laptop.jpg"
            alt="login"
            onError={(e) =>
              (e.target.src =
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80")
            }
          />
        </div>
      </div>
    </section>
  );
}
