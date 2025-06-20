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
       cc:"collageprepmanit@gmail.com",
      subject:  title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};
module.exports=mailsender;
