'use strict';
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Patient = require("../models/patient");
const HttpError = require("../models/http-error");
const catchAsync = require("../utils/catchAsync");
const Appointment = require("../models/appointment");
const { validationResult } = require("express-validator");

exports.signup = catchAsync(async (req, res, next) => {
    if (!validationResult(req).isEmpty()) throw new HttpError("Invalid inputs passed, please check your data", 422);
    const { name, dateOfBirth, email, password, gender, phoneNo } = req.body;
    const existingPatient = await Patient.findOne({ email: email });
    if (existingPatient) throw new HttpError("User already exists, please login", 422);
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdPatient = await Patient.create({
        name,
        dateOfBirth,
        email,
        gender,
        password: hashedPassword,
        phoneNo,
        profileImage: req.files[0].path,
        appointments: [],
        questions: [],
    });
    const token = jwt.sign({
        id: createdPatient.id,
        email: createdPatient.email,
        name: createdPatient.name,
        role: "patient",
    }, process.env.JWT_KEY, {
        expiresIn: "6d",
    });
    const user = _.pick(createdPatient, ["id", "name", "email"]);
    res.status(201).json({ ...user, token });
});

exports.login = catchAsync(async (req, res, next) => {
    if (!validationResult(req).isEmpty()) throw new HttpError("Invalid inputs passed, please check your data", 422);
    const { email, password } = req.body;
    const existingPatient = await Patient.findOne({ email: email });
    if (!existingPatient) throw new HttpError("Invalid credentials, could not log you in.", 401);
    const isValidPassword = await bcrypt.compare(password, existingPatient.password);
    if (!isValidPassword) throw new HttpError("Invalid credentials, could not log you in.", 401)
    const token = jwt.sign({
        id: existingPatient.id,
        email: existingPatient.email,
        type: "patient",
        name: existingPatient.name,
    }, process.env.JWT_KEY, {
        expiresIn: "6d",
    });
    const user = _.pick(existingPatient, ["id", "name", "email"]);
    res.status(201).json({ ...user, token });
});

exports.getProfile = catchAsync(async (req, res, next) => {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) throw new HttpError("Something went wrong, could not find patient.", 500)
    res.status(200).json({ patient: _.omit(patient.toObject({ getters: true }), "password") });
});


exports.editInfo = catchAsync(async (req, res, next) => {
    const patientId = req.params.patientId;
    const { phoneNo, password } = req.body;
    const updatedPatient = await Patient.findById(patientId);
    if (!updatedPatient) {
        throw new HttpError("Could not find patient", 404);
    }
    const isValidPassword = await bcrypt.compare(password, updatedPatient.password);
    if (!isValidPassword) {
        throw new HttpError("Invalid password, could not update info.", 401);
    }
    updatedPatient.phoneNo = phoneNo;
    await updatedPatient.save();
    const user = _.omit(updatedPatient.toObject(), "password");
    res.status(200).json({ patient: user });
});

exports.changePassword = catchAsync(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new HttpError("Invalid inputs", 422);
    }
    const patientId = req.params.patientId;
    if (req.userData.id !== patientId) {
        throw new HttpError("You are not authorized to change password", 401);
    }
    const { oldPassword, newPassword } = req.body;
    const updatedPatient = await Patient.findById(patientId);
    if (!updatedPatient) {
        throw new HttpError("Something went wrong, could not update information.", 500)
    }
    isValidPassword = await bcrypt.compare(oldPassword, updatedPatient.password);
    if (!isValidPassword) {
        throw new HttpError("Invalid password, could not update password.", 401)
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    updatedPatient.password = hashedPassword;
    await updatedPatient.save();
    const user = _.omit(updatedPatient.toObject(), "password");
    res.status(200).json({ patient: user });
});

exports.getAllAppointments = catchAsync(async (req, res, next) => {
    const appointments = await Appointment.find({ patientId: req.userData.id }).populate("doctorId");
    res.status(200).json({
        data: {
            appointments: appointments.map((appointment) => _.omit(appointment.toObject({ getters: true }), 
            ["doctorId.password", "doctorId.licenseFront", "doctorId.licenseBack", "doctorId.medicalId"])),
        },
    });
});
