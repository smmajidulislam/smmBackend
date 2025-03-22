const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }, // ক্যাটাগরি নাম
  count: { type: Number, required: true }, // প্রতিটি ক্যাটাগরির অধীনে কতটি সার্ভিস আছে
  names: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }], // `Service` টেবিলের আইডি লিস্ট
});

// Model তৈরি করা হচ্ছে

module.exports =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
