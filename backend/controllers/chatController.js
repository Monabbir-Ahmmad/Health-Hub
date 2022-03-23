const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const HttpError = require("../models/http-error");

exports.getChatInfo = async (req, res, next) => {
  const receiverId = req.params.id;
  const { id, type } = req.user;
  let error = false;
  let senderInfo;
  let receiverInfo;
  try {
    if (type === "patient") {
      senderInfo = await Patient.findById(id);
      receiverInfo = receiverId
        ? await Doctor.findById(receiverId)
        : null;
    } else {
      senderInfo = await Doctor.findById(id);
      receiverInfo = receiverId ? await Patient.findById(receiverId) : null;
    }
  } catch (err) {
      return next(new HttpError("Something Went Wrong", 401));
  }
  res.send({
    senderInfo,
    receiverInfo,
  });
};
