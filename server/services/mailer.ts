import {nodemailer, defaults} from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.google.com",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_APP_PASSWORD,
    },
});

let transporter = nodemailer.createTransport(transport[defaults])

