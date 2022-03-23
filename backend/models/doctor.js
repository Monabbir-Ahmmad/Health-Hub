const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const doctorSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  profileImage: { type: String, required: true },
  medicalId: { type: String, required: true, unique: true },
  licenseFront: { type: String, required: true },
  licenseBack: { type: String, required: true },
  specializations: [
    { type: String, required: true }
  ],
  qualifications: [
    { type: String, required: true }
  ],
  workplaces: [
    { type: String, required: true }
  ],
  appointments: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Appointment' }
  ],
  blogs: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Blog' }
  ]
});

// doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Doctor', doctorSchema);