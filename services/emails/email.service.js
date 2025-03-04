const nodemailer = require('nodemailer');

class EmailService {
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    sendMail = async ({ from, to, subject, html }) => {
        try {
            const transporter = this.createTransporter();
            const mailInfo = await transporter.sendMail({
                from: "noreply@example.com",
                to: "recipient@example.com",
                subject: "You have been received a message",
                html: html
            });

            console.log("<-------- mailId ------>", mailInfo.messageId);
        } catch (e) {
            console.log(e);
            throw new Error({ message: "Failed to send mail." });
        }
    }

    createTransporter = () => {
        try {
            return nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: this.username,
                    pass: this.password
                }
            });
        } catch (e) {
            throw new Error({ message: "Failed to create email transporter." });
        }
    }

    renderTemplate = ({ data }) => {
        try {
            const html = `
            <h1>Payment Successful</h1>
            <p>Your payment has been successful.</p>
            `;

            return html;
        } catch (e) {
            throw new Error({ message: "Failed to generate email template." });
        }
    };
}

module.exports = EmailService;