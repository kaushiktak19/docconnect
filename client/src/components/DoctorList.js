// import React from "react";
// import { useNavigate } from "react-router-dom";

// const DoctorList = ({ doctor }) => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div
//         className="m-2"
//         style={{ cursor: "pointer" }}
//         onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
//       >
//         <div className="">
//           Dr. {doctor.firstName} {doctor.lastName}
//         </div>
//         <div className="">
//           <p>
//             <b>Specialization</b> {doctor.specialization}
//           </p>
//           <p>
//             <b>Experience</b> {doctor.experience}
//           </p>
//           <p>
//             <b>Fees Per Cunsaltation</b> {doctor.fee}
//           </p>
//           <p>
//             <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DoctorList;

import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="m-2 p-4 border rounded-lg shadow-md cursor-pointer"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="flex flex-col items-center">
        <div className="font-bold text-lg mb-2">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <hr className="w-full border-t-2 border-gray-300 my-2" />
      </div>
      <div className="text-gray-700">
        <p>
          <span className="font-semibold">Specialization:</span> {doctor.specialization}
        </p>
        <p>
          <span className="font-semibold">Experience:</span> {doctor.experience}
        </p>
        <p>
          <span className="font-semibold">Fees Per Consultation:</span> {doctor.fees}
        </p>
        <p>
          <span className="font-semibold">Timings:</span> {doctor.timings[0]} - {doctor.timings[1]}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
