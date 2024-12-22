import { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.js";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generate.js";
import bcryptjs from "bcryptjs";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userALreadyExists = await User.findOne({ email });
    if (userALreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({ 
        email, 
        password: hashedPassword, 
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000
    });

    await user.save();

    //generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail("tranducbinh2004@gmail.com", verificationToken);
    
    res.status(201).json({
         message: "User created successfully",
         user:{
            ...user._doc,
            password: null,
         }
    });

  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    if(!user) {
      return res.status(400).json({message: "Invalid or expired verification code"});
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    res.status(200).json({ message: "Verify successfully" });
  } catch (error) {
    res.status(500).json({message: "Something went wrong", error: error.message});
  }

};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(400).json({ message: "Invalid credentials" });
     }
     const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      generateTokenAndSetCookie(res, user._id);
      user.lastLogin = Date.now();
      await user.save();
      res.status(200).json({
        message: "Logged in successfully",
        user: {
          ...user._doc,
          password: null,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try{
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 10 * 60 * 60 * 1000; // 1hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiredsAt = resetTokenExpiresAt;
    await user.save();

    //send email

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({ message: "Reset password email sent" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiredsAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    //update password
    const hasedPassword = await bcryptjs.hash(password, 10);

    user.password = hasedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiredsAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ user }); 
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};