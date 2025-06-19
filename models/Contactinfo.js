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
async function sendContactSuccessMail(email, name, query) {
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Query Received</title>
      <style>
        body {
          background-color:rgb(184, 114, 114);
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          background-color: #ffffff;
          margin: 40px auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        h2 {
          color: #2b2b2b;
          text-align: center;
        }
        p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
        }
        .highlight {
          background-color: #e0f7fa;
          padding: 12px;
          border-left: 4px solid #00acc1;
          margin: 20px 0;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          font-size: 13px;
          color: #aaa;
          margin-top: 30px;
        }
        .btn {
          display: inline-block;
          padding: 12px 20px;
          margin-top: 20px;
          color: #fff;
          background-color: #00acc1;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Thank You for Contacting Us!</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>We have successfully received your query. We willtry to resolve this  as soon as possible.</p>

        <div class="highlight">
          <p><strong>Your Query:</strong><br>${query || "No additional details provided."}</p>
        </div>

        <p>If you have more questions, feel free to reply to this email or visit our support page.</p>

        <a href="https://yourwebsite.com/support" class="btn">Visit Support</a>

        <div class="footer">
          &copy; ${new Date().getFullYear()} Collageprep. .
        </div>
      </div>
    </body>
  </html>
  `;

  try {
    const mailResponse = await mailsender(
      email,
      "Query Registered - Mail from CollegePrep",
      htmlContent
    );
    console.log("Contact confirmation mail sent:", mailResponse);
  } catch (error) {
    console.error("Error sending contact success mail:", error);
  }
}

// ✅ Post-save hook to trigger the email
ContactSchema.post("save", function (doc) {
  if (doc.email && doc.fullname) {
    sendContactSuccessMail(doc.email, doc.fullname, doc.query);
  }
});

module.exports = mongoose.model("Contactinfo", ContactSchema);
