const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // service: "gmail",
            // secure: true,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_HOST,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

    async sendOrder(data) {
        await this.transporter.sendMail({
            from: process.env.SMTP_HOST,
            to: process.env.SMTP_USER,
            subject: `Имя заказчика: ${!data.username ? '<отсутствует>': data.username}. Почта: ${!data.email ? '<отсутствует>': data.username}. Номер: ${data.phone}.`,
            from: data.email,
            html: `
            <div>
                <p>Общее количество позиций: ${data.amount}</p>
                <p>Общая стоимость: $${data.totalsum}</p>
            </div>
            <br/>
            ${data.userCart}
            ` 
        })
    }

}

module.exports = new MailService();



// `
// <div>
//     <h1>Поступил заказ</h1>
//         ${data.userCart.map((item) => {
//             return (
//                 `
//                 <div>
//                     <p>ID товара: ${item.productId}</p>
//                     <p>Цена за единицу: ${item.newprice}</p>
//                     <p>Количество: ${item.count}</p>
//                 </div>
//                 `
//             )
//         })}
//     </p>
//     <p>Количество позиций ${data.amount}</p>
//     <p>Общая соимоть <span>$</span>${data.totalsum}</p>
// </div>
// `