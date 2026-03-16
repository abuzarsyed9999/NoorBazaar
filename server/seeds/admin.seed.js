require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User.model");

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const user = await User.findOneAndUpdate(
      { email: "abuzar@gmail.com" },
      { role: "admin" },
      { new: true },
    );

    if (!user) {
      console.log("❌ User not found! Register first.");
    } else {
      console.log(`✅ Success! ${user.email} is now ADMIN!`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
    }

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();
