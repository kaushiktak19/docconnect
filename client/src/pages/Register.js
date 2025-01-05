import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import "../styles/Register.css";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${API_BASE_URL}/api/v1/user/register`, values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="register-page h-screen flex">
      {/* Left Section */}
      <div
        className="left-section w-2/3 flex flex-col justify-center items-start p-12"
        style={{ backgroundColor: "#e0f7fa", color: "#333333" }}
      >
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Join <span className="text-teal-600">DocConnect</span>
        </h1>
        <p className="text-lg font-light mb-6">
          Register now to connect with healthcare providers and manage your
          appointments effortlessly.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>Easy registration process</li>
          <li>Access to a wide network of doctors</li>
          <li>Secure and reliable platform</li>
        </ul>
      </div>

      {/* Right Section */}
      <div
        className="right-section w-1/3 flex items-center justify-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="register-form-container bg-white p-8 rounded-lg shadow-lg w-96">
          <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
            <h3 className="text-center text-2xl font-bold mb-4">Register</h3>

            <Form.Item label="Name" name="name">
              <Input type="text" placeholder="Enter your name" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter your email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter your password" required />
            </Form.Item>

            <div className="text-center mb-4">
              <Link to="/login" className="text-teal-600 underline">
                Already a user? Login here
              </Link>
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded w-full"
            >
              Register
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
