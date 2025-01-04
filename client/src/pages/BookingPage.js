import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
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

  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    // <Layout>
    //   <h1 className="text-center">Booking Page</h1>
    //   <div className="m-2">
    //     {doctors && (
    //       <div>
    //         <h4>
    //           Dr.{doctors.firstName} {doctors.lastName}
    //         </h4>
    //         <h4>Fees : {doctors.fees}</h4>
    //         <h4>
    //           Timings : {doctors.timings && doctors.timings[0]} -{" "}
    //           {doctors.timings && doctors.timings[1]}{" "}
    //         </h4>
    //         <div className="flex flex-col w-50">
    //           <DatePicker
    //             className="m-2"
    //             format="DD-MM-YYYY"
    //             onChange={(value) => {
    //               //setIsAvailable(false)
    //               setDate(moment(value).format("DD-MM-YYYY"))
    //             }
    //             }
    //           />
    //           <TimePicker
    //             format="HH:mm"
    //             className="m-2"
    //             onChange={(value) => {
    //               //setIsAvailable(false)
    //               setTime(moment(value).format("HH:mm"));
    //             }}
    //           />
    //           <button className="bg-blue-500 hover:bg-blue-800 text-white font-medium m-1 py-1 px-2 rounded" onClick={handleAvailability}>
    //             Check Availability
    //           </button>
    //           {
    //             //!isAvailable && 
    //             <button className="bg-gray-500 hover:bg-gray-800 text-white font-medium m-1 py-1 px-2 rounded" onClick={handleBooking}>
    //               Book Now
    //             </button>
    //           }
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </Layout>
    <Layout>
      <h1 className="text-2xl text-center m-3 p-1 border-b-4 ">Bookings</h1>
      <div className="m-2 p-4 border rounded-lg shadow-md">
        {doctors && (
          <div>
            <h2 className="font-bold text-lg mb-2">
              Dr. {doctors.firstName} {doctors.lastName}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Fees:</span> {doctors.fees}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Timings:</span>{" "}
              {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}
            </p>
            <div className="flex flex-col">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => setTime(moment(value).format("HH:mm"))}
              />
              <button className="bg-blue-500 hover:bg-blue-800 text-white font-medium m-1 py-1 px-2 rounded" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="bg-gray-500 hover:bg-gray-800 text-white font-medium m-1 py-1 px-2 rounded" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;