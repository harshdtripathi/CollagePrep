const mongoose = require("mongoose");
const mailsender = require("../utils/mailsender");

const ContactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  query: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
}, { timestamps: true });

async function sendContactSuccessMail(email, name, query) {
  const htmlContentUser = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8" /><title>Query Received</title></head>
      <body>
        <h2>Thank You for Contacting Us!</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>We have received your query:</p>
        <blockquote>${query || "No additional details provided."}</blockquote>
        <p>This is an automated email. Do not reply.</p>
        <footer>&copy; ${new Date().getFullYear()} CollegePrep</footer>
      </body>
    </html>
  `;

  const htmlContentAdmin = `
    <h3>New Contact Query Received</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Query:</strong><br>${query || "No additional details provided."}</p>
  `;

  try {
    await mailsender(email, "Query Registered - Mail from CollegePrep", htmlContentUser);
    console.log("✅ Confirmation mail sent to:", email);

    await mailsender(process.env.MAIL_USER, "New Contact Query Received", htmlContentAdmin);
    console.log("✅ Admin notified");
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    throw error;
  }
}


// ✅ Post-save hook to trigger the email
ContactSchema.pre("save", async function (next) {
  try {
    if (this.email && this.fullname) {
      await sendContactSuccessMail(this.email, this.fullname, this.query);
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Contactinfo", ContactSchema);
