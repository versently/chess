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

    try {
        await transporter.sendMail(mailOptions);
        return new Response('Сообщение отправлено', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Ошибка отправки', { status: 500 });
    }
}
