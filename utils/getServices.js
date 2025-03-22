const service = require("../models/servicesModel");
require("dotenv").config();
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
async function getServices() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: API_KEY,
        action: "services",
      }),
    });

    const data = await response.json();
    data.map(async (item) => {
      const existingService = await service.findOne({ name: item.name });
      if (existingService) {
        return;
      }
      if (!existingService) {
        const newService = new service(item);
        await newService.save();
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
module.exports = getServices;
