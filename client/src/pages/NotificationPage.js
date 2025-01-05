import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import{useNavigate} from "react-router-dom"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

function NotificationPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post(`${API_BASE_URL}/api/v1/user/get-all-notification/`, {
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
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

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post(`${API_BASE_URL}/api/v1/user/delete-all-notification/`, {
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
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
    <Layout>
      <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Notification page</h1>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
            <div className="flex justify-end">
                <h4 className="p-2" onClick={handleMarkAllRead}>
                Mark all read
                </h4>
            </div>
            {
                user?.notification.map(notificationMsg => (
                    <div className="border-b-2 border-t-2" style={{cursor: "pointer"}}>
                        <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>
                            {notificationMsg.message}
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>
            <div className="flex justify-end">
                <h4 className="p-2" onClick={handleDeleteAllRead}>
                Delete all read
                </h4>
            </div>
            {
                user?.seenNotification.map(notificationMsg => (
                    <div className="border-b-2 border-t-2" style={{cursor: "pointer"}}>
                        <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>
                            {notificationMsg.message}
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
