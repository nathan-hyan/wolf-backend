export const TRANSPORT_CONFIG = {
  service: 'hotmail',
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
