const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  dripfeed: {
    type: Boolean,
    required: true,
  },
  refill: {
    type: Boolean,
    required: true,
  },
  cancel: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

module.exports = Service;
