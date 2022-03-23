"use strict";
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
const HttpError = require("../models/http-error");
const catchAsync = require("../utils/catchAsync");
const Appointment = require("../models/appointment");
const { validationResult } = require("express-validator");

exports.signup = catchAsync(async (req, res, next) => {
  if (!validationResult(req).isEmpty())
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  const {
    name,
    gender,
    phoneNo,
    email,
    password,
    medicalId,
    specializations,
    qualifications,
    workplaces,
  } = req.body;

  const existingDoctor = await Doctor.findOne({ email: email });

  if (existingDoctor)
    throw new HttpError("User already exists, please login", 422);

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdDoctor = await Doctor.create({
    name,
    gender,
    phoneNo,
    email,
    password: hashedPassword,
    profileImage: req.files[0].path,
    medicalId,
    licenseFront: req.files[1].path,
    licenseBack: req.files[2].path,
    specializations: JSON.parse(specializations),
    qualifications: JSON.parse(qualifications),
    workplaces: JSON.parse(workplaces),
    appointments: [],
    blogs: [],
  });
  const token = jwt.sign(
    {
      id: createdDoctor.id,
      email: createdDoctor.email,
      type: "doctor",
      name: createdDoctor.name,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "6d",
    }
  );
  const user = _.pick(createdDoctor, ["id", "name", "email"]);
  res.status(201).json({ ...user, token });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!validationResult(req).isEmpty())
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  const { email, password } = req.body;
  const existingDoctor = await Doctor.findOne({ email: email });
  if (!existingDoctor)
    throw new HttpError("Invalid credentials, could not log you in.", 401);
  const isValidPassword = await bcrypt.compare(
    password,
    existingDoctor.password
  );
  if (!isValidPassword)
    throw new HttpError("Invalid credentials, could not log you in.", 401);
  const token = jwt.sign(
    {
      id: existingDoctor.id,
      email: existingDoctor.email,
      type: "doctor",
      name: existingDoctor.name,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "6d",
    }
  );
  const user = _.pick(existingDoctor, ["id", "name", "email"]);
  res.status(201).json({ ...user, token });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const doctorId = req.params.id;
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new HttpError("Could not find doctor.", 404);
  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
});

exports.editInfo = catchAsync(async (req, res, next) => {
  const doctorId = req.params.doctorId;
  const { phoneNo, password, specializations, qualifications, workplaces } =
    req.body;
  const updatedDoctor = await Doctor.findById(doctorId);
  if (!updatedDoctor)
    throw new HttpError(
      "Something went wrong, could not update information.",
      500
    );
  let isValidPassword = false;
  isValidPassword = await bcrypt.compare(password, updatedDoctor.password);
  if (!isValidPassword)
    throw new HttpError("Invalid password, could not update info.", 401);
  updatedDoctor.phoneNo = phoneNo;
  updatedDoctor.specializations = specializations;
  updatedDoctor.qualifications = qualifications;
  updatedDoctor.workplaces = workplaces;
  await updatedDoctor.save();
  res.status(200).json({ doctor: updatedDoctor.toObject({ getters: true }) });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs", 422);
  }

  const doctorId = req.params.doctorId;
  const { oldPassword, newPassword } = req.body;
  const updatedDoctor = await Doctor.findById(doctorId);

  if (!updatedDoctor)
    throw new HttpError(
      "Something went wrong, could not update information.",
      500
    );

  let isValidPassword = false;

  isValidPassword = await bcrypt.compare(oldPassword, updatedDoctor.password);

  if (!isValidPassword) {
    throw new HttpError("Invalid password, could not update password.", 401);
  }
  if (newPassword === oldPassword) {
    throw new HttpError(
      "Old password and new password are same, could not update password.",
      401
    );
  }
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  updatedDoctor.password = hashedPassword;

  await updatedDoctor.save();

  res.status(200).json({ doctor: updatedDoctor.toObject({ getters: true }) });
});

exports.getDoctors = catchAsync(async (req, res, next) => {
  const { doctorName, speciality } = req.query;
  const doctors = await Doctor.find();

  if (!doctors) {
    throw new HttpError("Could not find any doctors.", 404);
  }

  let filteredDoctors;

  if (doctorName && speciality) {
    filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(doctorName.toLowerCase()) &&
        doctor.specializations.some((s) =>
          s.toLowerCase().includes(speciality.toLowerCase())
        )
    );
  } else if (doctorName) {
    filteredDoctors = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(doctorName.toLowerCase())
    );
  } else if (speciality) {
    filteredDoctors = doctors.filter((doctor) =>
      doctor.specializations.some((s) =>
        s.toLowerCase().includes(speciality.toLowerCase())
      )
    );
  } else {
    filteredDoctors = doctors;
  }
  res.status(200).json({
    doctors: filteredDoctors.map((doctor) =>
      doctor.toObject({ getters: true })
    ),
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctorId = req.params.doctorId;
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new HttpError("Could not find doctor.", 404);
  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
});

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  console.log(req.userData.id);
  const appointments = await Appointment.find({
    doctorId: req.userData.id,
  }).populate("patientId");
  res.status(200).json({
    data: {
      appointments: appointments.map((appointment) =>
        _.omit(appointment.toObject({ getters: true }), ["patientId.password"])
      ),
    },
  });
});
