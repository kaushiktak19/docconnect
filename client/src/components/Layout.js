import React from 'react'
import "../styles/Layout.css"
import {Avatar, Badge, message} from "antd"
import { adminMenu, userMenu } from '../data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

function Layout({ children }) {
    const { user } = useSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();

    //logout function
    const handleLogout = () => {
        localStorage.clear()
        message.success("Logout Successfully")
        navigate("/login")
    }

    // ----DOC MENU---- //
    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: "fa-solid fa-house",
        },
        {
            name: 'Appointments',
            path: '/doctor-appointments',
            icon: "fa-solid fa-list"
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-regular fa-user" 
        },

    ]
    // ----DOC MENU---- //

    // rendering menu-list
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu

    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h6>DocConnect</h6>
                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <div key={menu.path} className={`menu-item ${isActive ? "active" : ""}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                )
                            })}
                            <div className={`menu-item`} onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <Link to="/login">Logout</Link>
                                    </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='header-content' style={{cursor: "pointer"}}>
                                <i className="fa-solid fa-bell" />
                                <Badge count={user && user.notification.length} onClick={() => {navigate("/notification")}}>
                                    <Avatar shape='sqaure' size="small"/>
                                </Badge>
                                <Link to={`/doctor/profile/${user?._id}`}>{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
