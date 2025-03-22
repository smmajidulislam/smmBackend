const addBlance = require("../models/addBlance");
const User = require("../models/userModel");

const addBlanceController = async (req, res) => {
  const { user_id, amount } = req.body;
  try {
    const add = new addBlance({
      user_id,
      amount,
    });
    await add.save();
    res.status(201).json("add blance successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const blanceController = async (req, res) => {
  const { user_id } = req.body;
  try {
    const blance = await addBlance.findOne({ user_id });
    if (!blance) {
      return res.status(500).json({ message: "Blance not found" });
    }
    const findUser = await User.findOne({ _id: user_id });
    if (!findUser) {
      return res.status(500).json({ message: "User not found" });
    }
    if (blance.user_id.toString() === findUser._id.toString()) {
      const sumBlance = blance.amount + findUser.totalBlance;
      const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        { $set: { totalBlance: sumBlance } },
        { new: true }
      );
      await addBlance.findOneAndDelete({ user_id });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const showBlanceController = async (req, res) => {
  try {
    const findUser = await addBlance.find({}).populate("user_id");
    if (!findUser) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const rejectBlance = async (req, res) => {
  const { user_id } = req.body;
  try {
    const blance = await addBlance.findOneAndDelete({
      user_id: user_id.toString(),
    });
    res.status(200).json("blance reject successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const singleBlance = async (req, res) => {
  const { user_id } = req.body;
  try {
    const blance = await User.findOne({ _id: user_id });
    res.status(200).json(blance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addBlanceController,
  blanceController,
  showBlanceController,
  rejectBlance,
  singleBlance,
};
