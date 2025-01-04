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
  const [showCredentials, setShowCredentials] = useState(false); // State to toggle showing login credentials

  //form handler
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
      message.error("something went wrong");
    }
  };

  // Function to toggle showing login credentials
  const toggleShowCredentials = () => {
    setShowCredentials(!showCredentials);
  };

  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="ms-1.5 underline p-1.5">
          Not a user, Register here
        </Link>
        <button className="bg-blue-500 hover:bg-blue-800 text-white font-medium py-1 px-2 rounded" type="submit">
          Login
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={toggleShowCredentials}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-2 rounded"
          >
            {showCredentials ? "Hide" : "Show"} Demo Login Credentials
          </button>
          {showCredentials && (
            <div className="credentials mt-2">
              <p>----User data----</p>
              <p><strong>User:</strong> user@gmail.com</p>
              <p><strong>Password:</strong> 123456</p>
              <p>----Doctor data----</p>
              <p><strong>Doctor:</strong> johns@gmail.com</p>
              <p><strong>Password:</strong> 123456</p>
            </div>
          )}
        </div>
      </Form>

      
    </div>
  );
};

export default Login;
