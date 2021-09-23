export const TRANSPORT_CONFIG = {
  service: 'outlook',
  host: "smtp-mail.outlook.com",
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_SENDER_PASSWORD,
  },
};

export const MAIL = {
  from: `"Tienda Wolf" <${process.env.MAIL_SENDER}>`,
  to: process.env.MAIL_RECEIVER,
  subject: "Se realizó una nueva compra",
};
