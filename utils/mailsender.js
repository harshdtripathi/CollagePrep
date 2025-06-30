
// const nodemailer=require("nodemailer");


// const { Resend } = require('resend');

// const resend = new Resend(process.env.RESEND_API_KEY); // Make sure this is set in .env

// const mailsender = async (email, title, body) => {
//   try {
//     const response = await resend.emails.send({
//       from:  'CollegePrep <onboarding@resend.dev>',  // use a verified domain or Resend default
//       to: email,
//       subject:title,
//       html:body,
//     });
//     console.log("response-mai",response);
    

//     console.log("Email sent successfully:", response.id);
//     return response;
//   } catch (error) {
//     console.error("Error sending email with Resend:", error);
//     throw error;
//   }
// };

// module.exports = mailsender;













const nodemailer=require("nodemailer");

const mailsender= async(email,title, body)=>{
   try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
       

    const info = await transporter.sendMail({
      from: `"CollegePrep" <${process.env.MAIL_USER}>`,
      to: email,
      subject:  title,
      html: body,
    });
       console.log("informationmail",info);

    return info;
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};
module.exports=mailsender;
