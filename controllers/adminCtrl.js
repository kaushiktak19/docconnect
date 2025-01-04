const userModel = require("../models/userModel")
const doctorModel = require("../models/doctorModel")

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: "Users data list",
            data: users,
        })
    } 
    catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error while fectching users",
            error,
        })
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success: true,
            message: "Doctors data list",
            data: doctors,
        })
    } 
    catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error while fectching doctors",
            error,
        })
    }
}

//doc acc status
const changeAccountStatusController = async (req, res) => {
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type: "doctor-account-request-updated",
            message: `Your Doctor Account Request has ${status}`,
            onclickPath: "/notification"
        })

        user.isDoctor = status === "Approved" ? true : false
        await user.save()
        res.status(201).send({
            success: true,
            message: "Account status updated",
            data: doctor,
        })
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Account Status",
            error,
        })
    }
}



module.exports = { getAllUsersController, getAllDoctorsController, changeAccountStatusController }
// const doctorModel = require("../models/doctorModels");
// const userModel = require("../models/userModels");

// const getAllUsersController = async (req, res) => {
//     try {
//         const users = await userModel.find({});
//         res.status(200).send({
//             success: true,
//             message: "Users data list",
//             data: users,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error while fetching users",
//             error,
//         });
//     }
// };

// const getAllDoctorsController = async (req, res) => {
//     try {
//         const doctors = await doctorModel.find({});
//         res.status(200).send({
//             success: true,
//             message: "Doctors data list",
//             data: doctors,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error while fetching doctors",
//             error,
//         });
//     }
// };

// // Update doctor's account status
// const changeAccountStatusController = async (req, res) => {
//     try {
//         const { doctorId, status } = req.body;
//         const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });

//         if (!doctor) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Doctor not found",
//             });
//         }

//         const user = await userModel.findOne({ _id: doctor.userId });
        
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         user.notification.push({
//             type: "doctor-account-request-updated",
//             message: `Your Doctor Account Request has been ${status}`,
//             onclickPath: "/notification",
//         });

//         user.isDoctor = status === "approved";
//         await user.save();

//         res.status(201).send({
//             success: true,
//             message: "Account status updated",
//             data: doctor,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in updating account status",
//             error,
//         });
//     }
// };

// module.exports = {
//     getAllUsersController,
//     getAllDoctorsController,
//     changeAccountStatusController,
// };
