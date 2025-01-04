const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require("../controllers/adminCtrl");

// router object
const router = express.Router();

// Get method || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController)

// Get method || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController)

// POST ACCOUNT STATUS
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController)



module.exports = router