const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: [true, "An appointment must have a Doctor"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: [true, "An appointment must have a patient"],
  },
  title: String,
  timeStamp: String,
  date: {
    type: String,
  },
  time: String,
  diagnosis: {
    type: String,
    default: "",
  },
  tests: {
    type: String,
    default: "",
  },
  advice: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Appointment", appointmentSchema);
