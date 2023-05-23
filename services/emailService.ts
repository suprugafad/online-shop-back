// const {google} = require('googleapis');
//
// const oAuth2Client = new google.auth.OAuth2(
//   config.web.client_id,
//   config.web.client_secret,
// );
//
// const authUrl = oAuth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: 'https://www.googleapis.com/auth/gmail.send',
// });
//
// async function getToken(code: string) {
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.setCredentials(tokens);
//   return tokens;
// }
//
// const auth = oAuth2Client;
//
// export async function sendEmail(senderEmail: string, recipientEmail: string) {
//   const gmail = google.gmail({ version: 'v1', auth });
//   const message = `
//   From: ${senderEmail}
//   To: ${recipientEmail}
//   Subject: Reset password
//   html: '<p>Go to link for reseting password: <a href = resetPasswordLink > resetPasswordLink </a></p>'`;
//   const encodedMessage = Buffer.from(message).toString('base64');
//   const res = await gmail.users.messages.send({
//     userId: 'me',
//     requestBody: {
//       raw: encodedMessage
//     }
//   });
//   console.log('Email sent:', res.data);
// }

const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dfd5097b0b4a74",
    pass: "4c36548ca64dcf"
  }
});

const sendResetPasswordEmail = async (email: string, resetPasswordLink: string) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Link for reset password',
    html: `<p>Go to link to reset password: <a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log(`Письмо с ссылкой для сброса пароля отправлено на адрес: ${email}`);
  } catch (error) {
    console.error('Ошибка при отправке электронной почты:', error);
    throw new Error('Ошибка при отправке электронной почты');
  }
};

export {
  sendResetPasswordEmail,
};


