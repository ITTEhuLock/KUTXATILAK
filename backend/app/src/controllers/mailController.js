import nodemailer from 'nodemailer'
import { google } from 'googleapis';

import 'dotenv/config';

export async function emailaBidali() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: `"Your Name" <${process.env.GMAIL_USER}>`,
            to: 'noreplyehulock@gmail.com',
            subject: 'Test Email with OAuth2',
            text: 'This email was sent using OAuth2 authentication.',
            html: '<p>This email was sent using <b>OAuth2</b> authentication.</p>'
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result.messageId);
        return result;


    }catch(error){
        console.error('Error sending email:', error);
        throw error;
    }
}