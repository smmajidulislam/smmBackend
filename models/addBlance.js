const mongoose = require("mongoose");

const addBlanceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  isApproved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.AddBlance || mongoose.model("AddBlance", addBlanceSchema);
