import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from "axios"
import { Table } from 'antd'

function Users() {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setUsers(res.data.data)
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
    

    useEffect(() => {
      getUsers()
    }, [])

    //antD table col
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Doctor",
            dataIndex: "isDoctor",
            render: (text, record) => (
                <span>{record.isDoctor ? "Yes" : "No"}</span>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="flex">
                    <button className="bg-red-500 hover:bg-red-800 text-white font-medium py-1 px-2 rounded">
                        Block
                </button>
                </div>
            )
        },
    ]
    

  return (
    <Layout>
        <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Users</h1>
        <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users

