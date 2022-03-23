const drugs = require("../database/drugs");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const catchAsync = require("../utils/catchAsync");
const HttpError = require("../models/http-error");

exports.getDrug = catchAsync((req, res, next) => {
  const { drugName } = req.query;

  let drug;

  drug = drugs.find((drug) => {
    const drug_Name = drug.Name.toLowerCase();
    return drug_Name === drugName.toLowerCase();
  });

  if (!drug) {
    throw next(new HttpError("Drug not found", 404));
  }

  res.status(201).json({ drug: drug });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  let user;

  user = await Doctor.findById(id);

  if (!user) {
    user = await Patient.findById(id);
  }

  if (!user) {
    return next(new HttpError("User not found", 404));
  }

  res.status(200).json({
    name: user.name,
    profileImage: user.profileImage,
    email: user.email,
    gender: user.gender,
    phoneNo: user.phoneNo,
  });
});
