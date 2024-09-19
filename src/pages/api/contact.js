import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: import.meta.env.VITE_SMPT_HOST,
    port:  import.meta.env.VITE_NODEMAILER_PORT,
    secure: true,
    auth: {
        user: import.meta.env.VITE_EMAIL_SERVICE_USER_NAME,
        pass: import.meta.env.VITE_EMAIL_SERVICE_PASSWORD,
    }
});

export async function send({name, email, phone, message }) {
    const mailOptions = {
        from: import.meta.env.VITE_EMAIL_ADDRESS,
        to: import.meta.env.VITE_EMAIL_ADDRESS,
        replyTo: email,
        subject: `Сообщение от ${name}! Курсы по созданию шахмат!`,
        text: `Текст сообщения: ${message}\nНомер для связи: ${phone}\nПочта для связи: ${email}`
    };

     await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}
