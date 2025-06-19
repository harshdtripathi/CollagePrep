const express = require("express");
const Upload = require("../models/Upload"); // make sure this path is correct

exports.getallSemestermaterial = async (req, res) => {
  try {
    const { semester, year, department } = req.body;

    if (!semester || !year || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const material = await Upload.find({
      year: year,
      semester: semester,
      department: department,
    });

    console.log("semmat", material);

    res.status(200).json({
      success: true,
      message: "All semester material fetched successfully",
      material,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getsubjectmaterial = async (req, res) => {
  try {
    const { semester, year, department, subjects } = req.query;
    const rawsubject = req.query.subjects.split(","); // ["Database", "CN", "OS"]

    if (!semester || !year || !department || !subjects || !Array.isArray(rawsubject)) {
      return res.status(400).json({
        success: false,
        message: "All fields including 'subjects' array are required",
      });
    }
    console.log("flag");

    const material = await Upload.find({
     
      subject: { $in: rawsubject },
    });


    console.log("Subject material:", material);

    res.status(200).json({
      success: true,
      message: "Subject-wise materials fetched successfully",
      material,
    });
  } catch (e) {
    console.error("Error fetching subject materials:", e.message);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
