const Service = require("../models/servicesModel");
require("dotenv").config();
const CategoryModel = require("../models/categorysModel");
const mongoose = require("mongoose");

async function getCategory() {
  try {
    const categoryCount = await Service.aggregate([
      {
        $group: {
          _id: "$category", // `category` কে গ্রুপিং করার জন্য `_id` হিসেবে রাখা হয়েছে
          count: { $sum: 1 }, // প্রতিটি ক্যাটাগরিতে সার্ভিসের সংখ্যা যোগ করা
          names: { $push: "$_id" }, // `Service` এর `_id` সংগ্রহ করা
        },
      },
    ]);

    for (const item of categoryCount) {
      if (item && item._id) {
        // _id (category) চেক করা
        const existingCategory = await CategoryModel.findOne({
          category: item._id,
        });

        if (!existingCategory) {
          const newCategory = new CategoryModel({
            category: item._id, // এখানে `_id` সরিয়ে `category` ব্যবহার করা হয়েছে
            count: item.count, // সার্ভিসের সংখ্যা যুক্ত করা হয়েছে
            names: item.names.map((id) => new mongoose.Types.ObjectId(id)), // ObjectId লিস্টে রূপান্তর
          });

          await newCategory.save();
        }
        return;
      }
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

module.exports = getCategory;
