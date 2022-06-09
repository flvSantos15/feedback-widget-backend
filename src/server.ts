import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4313fbe6f24f3b",
    pass: "e4555898fc416f"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type, 
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    // email ficticio
    from: 'Equipe Feedget <oi@feedget.com>',
    // email real de destino
    to: 'Flavio Santos <flvSantos300@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style='font-family: sans-serif; font-size: 16px; color: #111;'>`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({data: feedback})
})

app.listen(3333, () => {
  console.log('HTTP server running and working and testing!')
})