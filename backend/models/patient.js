const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  phoneNo: { type: String, required: true },
  profileImage: { type: String, required: true },
  appointments: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Appointment' }
  ],
  questions: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Question' }
  ],
});

// patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Patient', patientSchema);