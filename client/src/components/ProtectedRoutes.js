import React, { useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { setUser } from "../redux/features/userslice"

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

function ProtectedRoutes({ children }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  // Defining getUser as a memoized function to avoid unnecessary re-renders
  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post(`${API_BASE_URL}/api/v1/user/getUserData`, 
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      
      dispatch(hideLoading())

      if (res.data.success) {
        dispatch(setUser(res.data.data))
      } else {
        localStorage.clear()  
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()  
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    // If the user is not loaded, fetch user data
    if (!user && localStorage.getItem("token")) {
      getUser()
    }
  }, [user, getUser])

  // If user is authenticated (token exists), render the children components
  if (user || localStorage.getItem("token")) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoutes
