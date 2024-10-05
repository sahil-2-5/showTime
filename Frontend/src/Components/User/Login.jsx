import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State to store validation errors

  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    if (!email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      validationErrors.email = "Invalid email format!";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required!";
    }

    return validationErrors;
  };

  const HandleUser = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await axios
        .post("http://localhost:5000/user/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.status) {
            navigate("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="h-screen w-full bg-zinc-600 flex justify-center items-center text-white bg-no-repeat bg-cover bg-[url('https://i.pinimg.com/736x/36/d3/10/36d310b5e084ee15c481ca6958a376b3.jpg')]">
        <form
          onSubmit={HandleUser}
          className="border rounded-3xl p-8 w-[400px] h-[500px] bg-white bg-opacity-15 backdrop-blur-sm"
          method="POST"
        >
          <h1
            className="text-4xl text-center font-bold mb-8"
            style={{ textShadow: "3px 3px 0 red" }}
          >
            Login Form
          </h1>

          {/* Email Field */}
          <div className="flex flex-col mt-4 mb-4">
            <label className="mb-2 text-lg font-medium" style={{ textShadow: "1px 1px 0 red" }}>
              Email
            </label>
            <input
              type="email"
              name="uname"
              className="p-3 rounded-lg bg-zinc-300 bg-opacity-60 text-red-600 font-semibold outline-none"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 mt-1">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col mt-4 mb-6" style={{ textShadow: "1px 1px 0 red" }}>
            <label className="mb-2 text-lg font-medium">Password</label>
            <input
              type="password"
              name="upassword"
              className="p-3 rounded-lg bg-zinc-300 bg-opacity-60 text-red-600 font-semibold outline-none"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 mt-1">{errors.password}</span>}
          </div>

          {/* Signup Link */}
          <div className="flex justify-start mt-4">
            <Link to="/signup" className="font-bold text-sm underline transition duration-300 text-red-600">
              Go to Sign Up
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-8 h-8 top-0 z-50 bg-zinc-200 rounded-full shadow-lg pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 15}px, ${mousePosition.y - 15}px)`,
          boxShadow: "2px 2px 0px red",
        }}
      ></div>
    </>
  );
};

export default Login;
