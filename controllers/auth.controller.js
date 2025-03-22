const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the user is verified
    if (!existingUser.isVerified) {
      return res.status(400).json({ message: "User not verified" });
    }
    // Compare the password with the hashed password
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response with token
    res.status(200).json({
      message: "Login successful",
      token,
      role: existingUser.role,
      _id: existingUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Register Controller (sample)
const registerController = async (req, res) => {
  const verifyToken = () => {
    const token = (Math.random() * 1000000).toFixed(0);
    return token;
  };
  const randomNumber = verifyToken();
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      profilePicture,
      dateOfBirth,
      gender,
      isVerified,
      isActive,
      role,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // Early return to prevent further code execution
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      profilePicture,
      dateOfBirth,
      gender,
      isVerified,
      isActive,
      role,
    });

    // Save the new user to the database
    await user.save();
    const userVerify = new Otp({
      email,
      randomNumber,
    });
    await userVerify.save();

    // Send verification email
    await sendMail({
      email,
      subject: "Verify your email",
      message: `Your verification code is ${randomNumber}`,
    });
    // Send success response
    return res.status(201).json({
      message: "Register successful please cheak your email for verify",
    }); // Ensure return to stop further execution
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message:
          "ivalid request.please fillup the form care fully.Must number start +880 or +91 or something ",
      }); // Ensure return to stop further execution
  }
};
const verifyController = async (req, res) => {
  const { email, randomNumber } = req.body;

  const existingUser = await Otp.findOne({
    email,
  });

  if (!existingUser) return res.status(500).json("User did not Exist");
  try {
    if (existingUser.randomNumber === randomNumber) {
      const verifiedUser = await User.findOneAndUpdate(
        { email },
        { $set: { isVerified: true } },
        { new: true }
      );
      // await Otp.findOneAndDelete({ email });

      res.status(201).json(verifiedUser);
    }
  } catch (error) {
    res.status(500).json("something Error");
  }
};
const verify_resend = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Otp.findOne({ email });
    const verifyToken = () => {
      const token = (Math.random() * 1000000).toFixed(0);
      return token;
    };
    const randomNumber = verifyToken();
    if (!existingUser) {
      const userVerify = new Otp({
        email,
        randomNumber,
      });
      await userVerify.save();
    }
    if (existingUser) {
      const verifyToken = () => {
        const token = (Math.random() * 1000000).toFixed(0);
        return token;
      };
      const randomNumber = verifyToken();
      await Otp.findOneAndUpdate(
        { email },
        { $set: { randomNumber: randomNumber } },
        { new: true }
      );
      await sendMail({
        email,
        subject: "Verify your email",
        message: `Your verification code is ${randomNumber}`,
      });
      res.status(201).json("otp send");
    }
  } catch (error) {
    res.status(500).json("something Error");
  }
};

module.exports = {
  loginController,
  registerController,
  verifyController,
  verify_resend,
};
