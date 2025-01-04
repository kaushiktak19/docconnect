import { Form, Input, message } from 'antd'
import axios from "axios"
import React from 'react'
import "../styles/Register.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'


function Register() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    //form handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("./api/v1/user/register", values)
            dispatch(hideLoading())
            if(res.data.success){
                message.success("Registered Successfully")
                navigate("/login")
            }
            else{
                message.error(res.data.message)
            }
        } 
        catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }
    }

    return (
    <>
        <div className='form-container'>
            <Form layout='vertical' onFinish={onFinishHandler} className="register-form" >
                <h1 className=" font-medium text-center"> Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input type='text' required /> 
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email' required /> 
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password' required /> 
                </Form.Item>
                <Link to="/login" className="ms-1.5 underline p-1.5">
                    Already a user, Login Here
                </Link>
                <button className="bg-blue-500 hover:bg-blue-800 text-white font-medium py-1 px-2 rounded"
                    type='submit'>
                        Register
                </button>
            </Form>
        </div>
    </>
  )
}

export default Register
