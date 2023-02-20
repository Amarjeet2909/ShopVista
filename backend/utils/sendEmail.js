// In this file password reset process invloved by sending mail to user
// nodemailer is a package that has been installed in this project for sending the mail
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },

    });

    // preparing mail to send
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    // sending mail by passing mailOptions
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;