const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // বেসিক ইনফরমেশন
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10,15}$/],
  },
  totalBlance: {
    type: Number,
    default: 0,
  },

  // ঠিকানা
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true, default: "Bangladesh" },
  },

  // প্রোফাইল ইনফরমেশন
  profilePicture: {
    type: String,
    default: "default-profile.jpg",
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },

  // অ্যাকাউন্ট স্ট্যাটাস
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // টাইমস্ট্যাম্প
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// মডেলটি এক্সপোর্ট করুন
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
