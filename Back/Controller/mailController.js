const nodemailer = require("nodemailer")
const sendMail = async (req, res) => {
    const { name,email,message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Email options
        const mailOptions = {
            from: "ERMINE Contact",
            to: process.env.EMAIL,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: 'Geist', Arial, sans-serif; color: #000000; padding: 20px;">
                    <h2 style="color: #000000;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <p style="color: #000000;">This email was sent from the ERMINE website.</p>
                </div>
            `,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return res.status(200).json({ status: true, message: "Mail Send Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Mail Send Failed" })
    }
}
const mailController = {
    sendMail
}
module.exports = mailController