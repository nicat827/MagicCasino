const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port:465,
            secure:true,
            auth: {
                user:'biba827',
                pass: 'lcwaouapdprsjhpd'
                
            }
        })
    }


    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'biba827@yandex.ru',
            to,
            subject: "Активация аккаунта на http://localhost:5000 ",
            text:'',
            html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `    
        })


    }
}

module.exports = new MailService();