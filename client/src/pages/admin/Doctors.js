import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from "axios"
import { Table, message } from 'antd'

function Doctors() {
    const [doctors, setDoctors] = useState([])

    const getDoctors = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllDoctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setDoctors(res.data.data)
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
    
    //handle account
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post("/api/v1/admin/changeAccountStatus", 
                {doctorId: record._id, userId: record.userId, status: status},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                message.success(res.data.message)
                //window.location.reload()
            }
        } 
        catch (error) {
            message.error("Something went wrong")
        }
    }

    useEffect(() => {
      getDoctors()
    }, [])

    //antD table col // render is antD related not react
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="flex">
                    
                    {
                        record.status === "pending" ? 
                            <button className="bg-green-500 hover:bg-green-800 text-white font-medium py-1 px-2 rounded"
                                onClick={() => handleAccountStatus(record, "Approved")}>
                                Approve
                            </button>
                            :
                            <button className="bg-red-500 hover:bg-red-800 text-white font-medium py-1 px-2 rounded">
                                Reject
                            </button>
                    }
                
                </div>
            )
        },
    ]
    

  return (
    <Layout>
        <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Doctors</h1>
        <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors
