const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["papers", "books", "notes", "youtube"],
    required: true,
  },
  notesfileUrls: [
    {
      type: String,
      trim: true,
    },
  ],
  paperfileUrls: [
    {
      type: String,
      trim: true,
    },
  ],
  booksfileUrls: [
    {
      type: String,
      trim: true,
    },
  ],
  youtubeLinks: [
    {
      type: String,
      trim: true,
    },
  ],
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  examyear: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Add compound unique index here
UploadSchema.index(
  {
    subject: 1,
    semester: 1,
    examyear: 1,
    type: 1,
    department: 1,
    title: 1,// or unique in mid-term and end-term
  },
  { unique: true }
  
);

module.exports = mongoose.model("Upload", UploadSchema);
