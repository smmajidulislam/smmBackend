const e = require("express");
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  randomNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 15,
  },
});
module.exports = mongoose.models.Otp || mongoose.model("Otp", otpSchema);
