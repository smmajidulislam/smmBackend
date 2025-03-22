const mongoose = require("mongoose");

const orderDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, required: true },
  service_id: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.OrderData || mongoose.model("OrderData", orderDataSchema);
