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

// ✅ Function to send contact success mail with HTML template
 // update the path accordingly

async function sendContactSuccessMail(email, name, query) {
  const htmlContentUser = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Query Received</title>
        <style>
          /* ... your styles remain unchanged ... */
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Thank You for Contacting Us!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>We have successfully received your query. We will try to resolve this as soon as possible.</p>

          <div class="highlight">
            <p><strong>Your Query:</strong><br>${query || "No additional details provided."}</p>
          </div>

          <p>This email is comutergenerated so dont reply to this mail.</p>

          <a href="https://yourwebsite.com/support" class="btn">Visit Support</a>

          <div class="footer">
            &copy; ${new Date().getFullYear()} CollegePrep.
          </div>
        </div>
      </body>
    </html>
  `;

  const htmlContentAdmin = `
    <h3>New Contact Query Received</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Query:</strong><br>${query || "No additional details provided."}</p>
  `;

  // const htmlContentAdmin = `
  //   <h3>New Contact Query Received</h3>
  //   <p><strong>Name:</strong> ${name}</p>
  //   <p><strong>Email:</strong> ${email}</p>
  //   <p><strong>Query:</strong><br>${query || "No additional details provided."}</p>
  // `;

  try {
    // 1. Send confirmation to user
    await mailsender(email, "Query Registered - Mail from CollegePrep", htmlContentUser);
    console.log("User confirmation mail sent to:", email);

    // 2. Send alert to admin
    await mailsender(process.env.MAIL_USER, "New Contact Query Received", htmlContentAdmin);
    console.log("Admin notified about the new query");
  } catch (error) {
    console.error("Error sending contact emails:", error);
  }
}


// ✅ Post-save hook to trigger the email
ContactSchema.post("save", function (doc) {
  if (doc.email && doc.fullname) {
    sendContactSuccessMail(doc.email, doc.fullname, doc.query);
  }
});

module.exports = mongoose.model("Contactinfo", ContactSchema);
