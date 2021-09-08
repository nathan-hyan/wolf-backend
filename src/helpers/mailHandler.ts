import { MAIL, TRANSPORT_CONFIG } from "@configs/mail";
import { CartItem } from "@interfaces/product";
import nodemailer from "nodemailer";

export async function sendPurchaseMail(name: string, whatsapp: number, products: CartItem[]) {
    const TOTAL_AMOUNT = products.reduce((prevValue, {price}) => (prevValue + price), 0)
    const html = `<!DOCTYPE html>
    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
          th.column {
            padding: 0;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
          p {
            line-height: inherit;
          }
          @media (max-width: 520px) {
            .icons-inner {
              text-align: center;
            }
            .icons-inner td {
              margin: 0 auto;
            }
            .row-content {
              width: 100% !important;
            }
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body
        style="
          background-color: #fff;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0; mso-table-rspace: 0"
                          width="500"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="heading_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        width: 100%;
                                        text-align: center;
                                        padding-top: 5px;
                                      "
                                    >
                                      <h1
                                        style="
                                          margin: 0;
                                          color: #555;
                                          font-size: 23px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          line-height: 120%;
                                          text-align: center;
                                          direction: ltr;
                                          font-weight: 400;
                                          letter-spacing: normal;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                        "
                                      >
                                        <strong>¡Nueva compra realizada!</strong>
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0;
                                    mso-table-rspace: 0;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            color: #4d4d4d;
                                            line-height: 1.2;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p style="margin: 0; font-size: 14px">
                                            ¡Hola! El usuario
                                            <span style="color: #0682ca"
                                              ><strong>${name}</strong></span
                                            >
                                            hizo una compra por un monto de
                                            <span style="color: #0682ca"
                                              ><strong>$${TOTAL_AMOUNT}</strong></span
                                            >
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              mso-line-height-alt: 16.8px;
                                            "
                                          >
                                            <br />
                                          </p>
                                          <p style="margin: 0; font-size: 14px">
                                            Los items comprados son:
                                          </p>
                                          <ol style="font-size: 14px">
                                            ${products.map(product => `<li>
                                              <strong>${product.name}</strong> -
                                              <em> Cantidad: ${product.quantity}</em>
                                            </li>`)}
                                          </ol>
                                          <p style="margin: 0">
                                            Para comunicarse con el usuario, haga
                                            click en el botón de abajo para abrir
                                            <strong>WhatsApp</strong>
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-alt: 16.8px;
                                            "
                                          >
                                            <br />
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-alt: 16.8px;
                                            "
                                          >
                                            <br />
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="button_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-top: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 15px;
                                        padding-left: 10px;
                                      "
                                    >
                                      <div align="center">
                                        <!--[if gte mso 12
                                          ]><style>
                                            div.btnw {
                                              display: block !important;
                                            }
                                          </style>
                                          <div class="btnw" style="display: none">
                                            <a:roundrect
                                              xmlns:a="urn:schemas-microsoft-com:vml"
                                              xmlns:w="urn:schemas-microsoft-com:office:word"
                                              href="https://wa.me/${whatsapp}"
                                              style="
                                                v-text-anchor: middle;
                                                width: 152px;
                                                height: 42px;
                                              "
                                              arcsize="10%"
                                              stroke="false"
                                              fillcolor="#3AAEE0"
                                              ><w:anchorlock /><v:textbox
                                                inset="0px,0px,0px,0px"
                                                ><center
                                                  style="
                                                    font-family: sans-serif;
                                                    color: #ffffff;
                                                    font-size: 16px;
                                                  "
                                                >
                                                  Abrir WhatsApp
                                                </center></v:textbox
                                              ></a:roundrect
                                            >
                                          </div><!
                                        [endif]-->
                                        <!--[if !mso
                                        ]><!--><a
                                          href="https://wa.me/${whatsapp}"
                                          style="
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                            background-color: #3aaee0;
                                            border-radius: 4px;
                                            color: #fff;
                                            line-height: 200%;
                                            width: auto;
                                            display: inline-block;
                                            text-align: center;
                                            text-decoration: none;
                                          "
                                          ><div
                                            style="
                                              padding-top: 5px;
                                              padding-right: 20px;
                                              padding-bottom: 5px;
                                              padding-left: 20px;
                                            "
                                          >
                                            <div
                                              style="
                                                font-size: 12px;
                                                line-height: 24px;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  font-size: 16px;
                                                  line-height: 32px;
                                                "
                                              >
                                                Abrir WhatsApp
                                              </p>
                                            </div>
                                          </div></a
                                        ><!--<![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0; mso-table-rspace: 0"
                          width="500"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="icons_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        color: #9d9d9d;
                                        font-family: inherit;
                                        font-size: 15px;
                                        padding-bottom: 10px;
                                        padding-top: 10px;
                                        text-align: center;
                                      "
                                    >
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>
    `
    const transporter = nodemailer.createTransport(TRANSPORT_CONFIG);
    const mailInfo = await transporter.sendMail({...MAIL, html});

    console.log("📧 >> Mail sent! //", mailInfo.messageId);
}
