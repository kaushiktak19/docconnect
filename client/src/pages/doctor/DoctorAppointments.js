import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/doctor/doctor-appointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/doctor/update-status`,
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" && (
            <div className="flex">
              <button
                className="bg-green-500 hover:bg-green-800 text-white font-medium m-2 p-2 rounded"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-800 text-white font-medium m-2 p-2 rounded"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;