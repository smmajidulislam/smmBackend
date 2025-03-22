const OrderData = require("../models/orderDataModel");

require("dotenv").config();

const orderPlacement = async (req, res) => {
  try {
    const { user_id, quantity, service_id } = req.body;

    const newOrder = new OrderData({
      user_id,
      quantity,
      service_id,
    });

    await newOrder.save();

    res.status(201).json("order placed successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminOrder = async (req, res) => {
  const { user_id } = req.body;
  const user = await OrderData.findOne({ user_id });
  try {
    const apiKey = process.env.API_KEY;
    const orderData = {
      key: apiKey,
      action: "add",
      service: user.service_id,
      link: "https://instagram.com/example_user",
      quantity: user.quantity,
    };

    const response = await fetch("https://socialpanel24.com/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Order Response:", data);
  } catch (error) {
    console.error("API Error:", error);
  }
};
const orderShowingAdmin = async (req, res) => {
  try {
    const orderData = await OrderData.find({}).populate("service_id");
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const orderShowingUser = async (req, res) => {
  const user_id = req.body.user_id;
  try {
    const orderData = await OrderData.find({ user_id }).populate("service_id");
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const orderAccept = async (req, res) => {
  const id = req.body._id;
  try {
    const orderData = await OrderData.findByIdAndUpdate(
      id,
      { $set: { isApproved: true } },
      { new: true }
    );

    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  orderPlacement,
  adminOrder,
  orderShowingAdmin,
  orderAccept,
  orderShowingUser,
};
