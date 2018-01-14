const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
const pug = require('pug')
const debug = require('debug')('app:mailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

module.exports = async (to, subject, template, locals) => {
  const from = '"Fred Foo 👻" <foo@blurdybloop.com>'
  const html = pug.renderFile(`templates/email/${template}.pug`, locals)
  const text = htmlToText.fromString(html)

  debug('Sending')

  const info = await transporter.sendMail({ from, to, subject, html, text })

  debug(`Message ${info.messageId} sent: ${info.response}`)
}
