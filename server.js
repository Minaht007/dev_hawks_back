const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3001;

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: EMAIL_PORT,
	secure: true,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

app.post("/send", (req, res) => {
	const { to, subject, text } = req.body;

	const mailOptions = {
		from: EMAIL_USER,
		to: to,
		subject: subject,
		text: text,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({ message: "Reject send.", error });
		}
		res.status(200).json({ message: "Success send.", info });
	});
});

app.listen(port, () => {
	console.log(`Server starting on Port: ${port}`);
});