import React, { useState } from "react";
import "../styles/Register.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCredentials, setShowCredentials] = useState(false);

  // Form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // Toggle credentials visibility
  const toggleShowCredentials = () => {
    setShowCredentials(!showCredentials);
  };

  return (
    <div className="login-page h-screen flex">
      {/* Left Section */}
      <div
        className="left-section w-2/3 flex flex-col justify-center items-start p-12"
        style={{ backgroundColor: "#e0f7fa", color: "#333333" }}
      >
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Welcome to <span className="text-teal-600">DocConnect</span>
        </h1>
        <p className="text-lg font-light mb-6">
          Your platform for booking & managing healthcare appointments, connecting with professionals, and ensuring better patient care.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>Streamline appointment scheduling</li>
          <li>Access healthcare providers</li>
          <li>Enhance patient-doctor communication</li>
        </ul>
      </div>

      {/* Right Section */}
      <div
        className="right-section w-1/3 flex items-center justify-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="login-form-container bg-white p-8 rounded-lg shadow-lg w-96">
          <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
            <h3 className="text-center text-2xl font-bold mb-4">Login</h3>
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter your email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter your password" required />
            </Form.Item>
            <div className="text-center mb-4">
              <Link to="/register" className="text-teal-600 underline">
                Not a user? Register here
              </Link>
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </Form>

          {/* Demo Credentials */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleShowCredentials}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-4 rounded"
            >
              {showCredentials ? "Hide" : "Show"} Demo Credentials
            </button>
            {showCredentials && (
              <div className="credentials mt-4 text-sm text-left bg-gray-100 p-4 rounded">
                <p>---- User Data ----</p>
                <p>
                  <strong>Email:</strong> user@gmail.com
                </p>
                <p>
                  <strong>Password:</strong> 123456
                </p>
                <p>---- Doctor Data ----</p>
                <p>
                  <strong>Email:</strong> johns@gmail.com
                </p>
                <p>
                  <strong>Password:</strong> 123456
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
