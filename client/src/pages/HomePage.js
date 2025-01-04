// import React, { useEffect } from 'react'
// import axios from "axios"
// import Layout from "../components/Layout"

// function HomePage() {

//     // login user-data
//     const getuserData  = async () => {
//       try {
//         const res = await axios.post("/api/v1/user/getUserData",{}, {
//           headers: {
//             Authorization: "Brearer" + localStorage.getItem("token"),
//           },
//         })
//       } 
//       catch (error) {
//         console.log(error)
//       }
//     }

//     useEffect(() =>{

//     }, [])

//     return (
//       <Layout>
//         <h1>
//           Home Page
//         </h1>
//       </Layout>
//     )
// }

// export default HomePage
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
