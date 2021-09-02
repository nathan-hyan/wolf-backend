export const TRANSPORT_CONFIG = {
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
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
