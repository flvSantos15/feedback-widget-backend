import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail.adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4313fbe6f24f3b",
    pass: "e4555898fc416f"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    // email ficticio
    from: 'Equipe Feedget <oi@feedget.com>',
    // email real de destino
    to: 'Flavio Santos <flvSantos300@gmail.com>',
    subject,
    html: body
  })
  }
}