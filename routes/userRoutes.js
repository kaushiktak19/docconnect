const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");


// router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController)

//register || POST
router.post("/register", registerController)

//auth || POST
router.post("/getUserData", authMiddleware, authController)

//apply-doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController)

//notification doctor || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController)

//notification doctor || POST
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController)

// GET ALL DOCs
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController)

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController)

// BOOKING Availability
router.post("/booking-availability", authMiddleware, bookingAvailabilityController);

// Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController)



module.exports = router

