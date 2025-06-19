const express = require("express");
const Contactinfo = require("../models/Contactinfo"); // Fix: import model, not schema

exports.StudentContact = async (req, res) => {
  try {
    const { fullname, email, query, year, department } = req.body;
    const userId = req.user.id;
    console.log("userid",userId);

    // Check required fields
    if (!fullname || !email || !year || !department) {
      return res.status(400).json({
        success: false,
        message: "Fullname, email, year, and department are required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const contactInfo = new Contactinfo({
      fullname,
      email,
      query,
      year,
      department,
    });

    await contactInfo.save(); // Save to DB

    // TODO: You can trigger a mail here if you want

    return res.status(200).json({
      success: true,
      message: "Query registered successfully. Check your mail.",
    });

  } catch (e) {
    console.log("Error:", e.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong: " + e.message,
    });
  }
};
