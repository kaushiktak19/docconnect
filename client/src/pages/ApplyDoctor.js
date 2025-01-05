// import { Form, Input, TimePicker, Row, Col, message } from 'antd'
// import Layout from '../components/Layout'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { hideLoading, showLoading } from '../redux/features/alertSlice'
// import axios from 'axios'
// import moment from "moment";

// function ApplyDoctor() {

//     const {user} = useSelector(state => state.user)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const handleFinish = async (values) => {
//         try {
//             dispatch(showLoading())
//             const res = await  axios.post("api/v1/user/apply-doctor", 
//                 {
//                     ...values,
//                     userId: user._id,
//                     timings: [
//                       moment(values.timings[0]).format("HH:mm"),
//                       moment(values.timings[1]).format("HH:mm"),
//                     ],
//                 },
//                 {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             })
//             dispatch(hideLoading())
//             if(res.data.success){
//                 message.success(res.data.message)
//                 navigate("/")
//             }
//             else{
//                 message.error(res.data.success)
//             }
//         } 
//         catch (error) {
//             dispatch(hideLoading())
//             console.log(values)
//             message.error("something went wrong")
//         }
//     }

//   return (
//     <Layout>
//         <h1 className="text-center">Apply Doctor</h1>
//         <Form layout="vertical" onFinish={handleFinish} className="m-3">
//             <h4>Personal Details: </h4>
//             <Row gutter={20}>
//                 <Col xs={24} md={24} lg={8}>
//                 <Form.Item
//                         label="First Name"
//                         name="firstName"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your First Name' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Last Name"
//                         name="lastName"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your Last Name' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Phone Number"
//                         name="phone"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your Phone Number' />
//                     </Form.Item>
//                     <Form.Item
//                         label="E-mail"
//                         name="email"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your E-mail' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Website"
//                         name="website"
//                         required
//                         rules={[{required: false}]}
//                     >
//                         <Input type='text' placeholder='website' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Address"
//                         name="address"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your Address' />
//                     </Form.Item>
//                 </Col> 
//             </Row>

//             <h4>Professional Details: </h4>
//             <Row gutter={20}>
//                 <Col xs={24} md={24} lg={8}>
//                     <Form.Item
//                         label="Specialization"
//                         name="specialization"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your Specialization' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Experience"
//                         name="experience"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Experience' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Fees per Consultation"
//                         name="fees"
//                         required
//                         rules={[{required: true}]}
//                     >
//                         <Input type='text' placeholder='Your fee' />
//                     </Form.Item>
//                     <Form.Item
//                         label="Timings"
//                         name="timings"
//                         required
//                         // rules={[{required: true}]}
//                     >
//                         <TimePicker.RangePicker format="HH:mm" />
//                     </Form.Item>
//                 </Col>
//             </Row>
//             <div className=" flex justify-end">
//                 <button className="bg-blue-500 hover:bg-blue-800 text-white font-medium py-1 px-2 rounded"
//                     type='submit'>
//                         Submit
//                 </button>
//             </div>
//         </Form>
//     </Layout>
//   )
// }

// export default ApplyDoctor

import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/apply-doctor`,
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your first name.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your last name.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your contact number.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Your email address.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Your website.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your clinic address.." />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your experience.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="fees"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Fees charges by you.." />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="bg-blue-500 hover:bg-blue-800 text-white font-medium py-1 px-2 rounded" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;