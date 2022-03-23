const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointment-controllers");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.post("/slots", appointmentController.getAppointmentSlots);

router.get("/", appointmentController.getAllAppointments);
router.get("/prescription/:id", appointmentController.getPrescription);

router.post("/", appointmentController.createAppointment);

router.patch("/prescription/:id", appointmentController.addPescriptionInfo);
router.delete("/:id", appointmentController.cancelAppointment);

module.exports = router;
