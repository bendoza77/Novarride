const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.SMP_USER,
        pass: process.env.SMP_PASS
    }
})

const sendEmail = async (to, subject, html) => {
    try {

        const info = transport.sendMail({
            from: "Novarride@gmail.com",
            subject,
            to,
            html
        })

        console.log(`Email was sent saccessfuyl at ${to} ${(await info).messageId}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail