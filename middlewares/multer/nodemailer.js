"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: true,
  auth: {
    user: 'softmastershr@outlook.com',
    pass: 'zsxcskrsobpzahpi'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"SoftMasters Office HR" <softmastershr@outlook.com>', // sender address
    to: "faiz.fawel@softmastersgroup.com", // list of receivers
    subject: "Payment Voucher Summary", // Subject line
    text: "Preview Payment Voucher", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
