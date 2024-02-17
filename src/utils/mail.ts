import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: ".env" });

interface Datos {
	email: string;
	nombre: string;
	token: string | null;
}

const emailRegistro = async (datos: Datos) => {
	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.APP_USER,
			pass: process.env.APP_PASSWORD,
		},
	});

	console.log(`daticos ${datos}`);

	const { email, nombre, token } = datos;
	try {
		await transport.sendMail({
			from: process.env.APP_USER,
			to: email,
			subject: "Confirm your account",
			html: `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com馃彚office">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <style>
          table, td, div, h1, p {font-family: Arial, sans-serif;}
        </style>
      </head>
      <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#E4EBEC;">
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #0065fca2;border-spacing:0;text-align:left;">
                <tr>
                  <td align="center" style="padding:40px 0 30px 0;background: #3f3f3f;">
                   <img src="https://i.postimg.cc/pLcVrsmz/logo-VV-en-blanco.png" alt="" width="200" style="height:auto;display:block; filter: drop-shadow(0 0 0.75rem #1e1e1e);" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 30px 20px 30px; background-color: #2F353A;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 0 0;">
                          <h1 align="center" style="font-size:24px;margin:0 0 20px 0;font-family: Arial, sans-serif;color:#01BBF1;  font-size: 30px;text-shadow: 2px 2px 4px #000000; filter: drop-shadow(0 0 0.75rem rgb(1, 67, 248));">Verify your account </h1>
                          <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 16px;color: #07adfa;">
                            <div><strong>Use the following link to verify your account:<a href="${process.env.BACKEND_URL}/api/v1/user/verify/${token}" style="font-size: 30px; margin:0 0 12px 0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;color:#07adfa; filter: drop-shadow(0 0 0.75rem rgb(1, 17, 61));"> Verify your account</a>  </strong></div>
                          </h1>
                          <br>
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family: Arial, sans-serif;color:#0c0c0c;">if you didnt create this account, pls dont pay attention to this message</p>
                        </td>
                      </tr>
                    
                    </table>
                  </td>
                </tr>
          </table>
        </body>
        </html>`,
		});
	} catch (error) {
		console.log(error);
	}
};

const emailReset = async (datos: Datos) => {
	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.APP_USER,
			pass: process.env.APP_PASSWORD,
		},
	});

	const { email, nombre, token } = datos;
	try {
		await transport.sendMail({
			from: "LuckyNotes@gmail.com",
			to: email,
			subject: "Reset your password",
			html: `<!DOCTYPE html>
      <html
        lang="en"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="x-apple-disable-message-reformatting" />
          <title></title>
          <!--[if mso]>
            <noscript>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            </noscript>
          <![endif]-->
          <style>
            table,
            td,
            div,
            h1,
            p {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0">
          <table
            role="presentation"
            style="
              width: 100%;
              border-collapse: collapse;
              border: 0;
              border-spacing: 0;
              background: #e4ebec;
            "
          >
            <tr>
              <td align="center" style="padding: 0">
                <table
                  role="presentation"
                  style="
                    width: 602px;
                    border-collapse: collapse;
                    border: 1px solid #0065fca2;
                    border-spacing: 0;
                    text-align: left;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      style="padding: 40px 0 30px 0; background: #3f3f3f"
                    >
                      <img
                        src="https://i.postimg.cc/pLcVrsmz/logo-VV-en-blanco.png"
                        alt=""
                        width="200"
                        style="
                          height: auto;
                          display: block;
                          filter: drop-shadow(0 0 0.75rem #1e1e1e);
                        "
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 36px 30px 20px 30px; background-color: #2f353a"
                    >
                      <table
                        role="presentation"
                        style="
                          width: 100%;
                          border-collapse: collapse;
                          border: 0;
                          border-spacing: 0;
                        "
                      >
                        <tr>
                          <td style="padding: 0 0 0 0">
                            <h1
                              align="center"
                              style="
                                font-size: 24px;
                                margin: 0 0 20px 0;
                                font-family: Arial, sans-serif;
                                color: #01bbf1;
                                font-size: 30px;
                                text-shadow: 2px 2px 4px #000000;
                                filter: drop-shadow(0 0 0.75rem rgb(1, 67, 248));
                              "
                            >
                              Reset your password
                            </h1>
                            <h1
                              style="
                                margin: 0px;
                                line-height: 140%;
                                text-align: center;
                                word-wrap: break-word;
                                font-weight: normal;
                                font-family: arial, helvetica, sans-serif;
                                font-size: 16px;
                                color: #01bbf1;
                              "
                            >
                              <div>
                                <strong
                                  >Use the following link to reset your password:
                                  <a
                                    href="${process.env.BACKEND_URL}/auth/reset_password/${token}"
                                    style="
                                      font-size: 30px;
                                      margin: 0 0 12px 0;
                                      font-size: 16px;
                                      line-height: 24px;
                                      font-family: Arial, sans-serif;
                                      color: #07adfa;
                                      filter: drop-shadow(0 0 0.75rem rgb(1, 17, 61));
                                    "
                                    >Reset your password</a
                                  ></strong
                                >
                              </div>
                            </h1>
                            <br />
                            <p
                              style="
                                margin: 0 0 12px 0;
                                font-size: 16px;
                                line-height: 24px;
                                font-family: Arial, sans-serif;
                                color: #0c0c0c;
                              "
                            >
                              If you didn't request a password reset, please ignore
                              this message.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
		});
	} catch (error) {
		console.log(error);
	}
};

export { emailRegistro, emailReset };
