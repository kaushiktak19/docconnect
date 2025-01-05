import React from 'react'
import { Navigate } from 'react-router-dom'
import axios from "axios"
import { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { setUser } from "../redux/features/userslice"

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

function ProtectedRoutes({children}) {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)

    //get user
    const getUser = async() => {
        try{
            dispatch(showLoading())
            const res = await axios.post(`${API_BASE_URL}/api/v1/user/getUserData`,
            { token : localStorage.getItem("token")},
            {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            )
            dispatch(hideLoading())
            if(res.data.success)
                dispatch(setUser(res.data.data))
            else{
                <Navigate to="/login" />
                localStorage.clear()
            }
           
        }
        catch (error){
            dispatch(hideLoading())
            localStorage.clear()
            console.log(error)
        }
    }

    useEffect(() =>{
        if(!user){
            getUser()
        }
    }, [user, getUser])

    if(localStorage.getItem("token"))
        return children
    else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes
