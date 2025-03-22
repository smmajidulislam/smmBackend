const Category = require("../models/categorysModel");

const getCategory = async (req, res) => {
  try {
    console.log("i am in");
    const findCategory = await Category.find({}).populate("names");
    res.status(200).json(findCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategory };
