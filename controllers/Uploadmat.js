const Upload = require("../models/Upload");

exports.handleUpload = async (req, res) => {
  try {
    const { title, type, year, semester, subject, department, examyear, youtubeLinks } = req.body;

    // const student_id = req.user;
    // if (!student_id) {
    //   return res.status(401).json({ success: false, message: "Unauthorized: student ID not found" });
    // }

    let newUpload = {
      title,
      type,
      year,
      semester,
      subject,
      department,
      examyear,
      
    };


    

    if (type === "papers" || type === "notes" || type === "books") {

      console.log("files",req.files);
      
      const urls = req.files.map((file) => file?.path); // Cloudinary URLs
      if (type === "papers") newUpload.paperfileUrls = urls;
      if (type === "notes") newUpload.notesfileUrls = urls;
      if (type === "books") newUpload.booksfileUrls = urls;
    }

    if (type === "youtube") {
      if (!youtubeLinks) {
        return res.status(400).json({ success: false, message: "Invalid YouTube links" });
      }
      const rawlinks = youtubeLinks.split(",").map((link) => link.trim());
      newUpload.youtubeLinks = rawlinks;
    }

    const saved = await Upload.create(newUpload);
    return res.status(200).json({ success: true, data: saved });

  } catch (err) {
    console.error("Upload error:", err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry: This material has already been uploaded.",
      });
    }
    return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
};
