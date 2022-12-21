require('dotenv').config()

export const FORGOTPASSWORD = (email, shortCode) => {
  const emailTemplate = {
    Source: `Admin <${process.env.EMAIL_FROM}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
                <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>

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
        background: #ffffff;
        background-color: #edece6;
      "
    >
      <tr>
        <td align="center" style="padding: 0">
          <table
            role="presentation"
            style="
              width: 602px;
              border-collapse: collapse;
              border: 1px solid #cccccc;
              border-spacing: 0;
              text-align: left;
            "
          >
            <tr>
              <td align="center">
                <img
                  src="${process.env.BANNER}"
                  alt=""
                  width="600"
                  style="height: auto; display: block"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 42px 30px">
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
                    <td style="padding: 0 0 36px 0; color: #153643">
                      <h1
                        style="
                          font-size: 24px;
                          margin: 0 0 20px 0;
                          font-family: Arial, sans-serif;
                        "
                      >
                        Don't worry ${name} please copy paste the Code below
                      </h1>
                      <p
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        This is code ${shortCode}, copy paste it at the forgot password page. 
                      </p>
                      <p
                        style="
                          margin: 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        <a
                          href="${process.env.URL}/forgot-password"
                          style="color: #ee4c50; text-decoration: underline"
                          >forgot password page</a
                        >
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0">
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
                          <td
                            style="
                              width: 20px;
                              padding: 0;
                              font-size: 0;
                              line-height: 0;
                            "
                          >
                            &nbsp;
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee8d4c">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                    font-size: 9px;
                    font-family: Arial, sans-serif;
                  "
                >
                  <tr>
                    <td style="padding: 0; width: 50%" align="left">
                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          line-height: 16px;
                          font-family: Arial, sans-serif;
                          color: #ffffff;
                        "
                      >
                        &reg; Aimanskie, 2023
                      </p>
                    </td>
                    <td style="padding: 0; width: 50%" align="right">
                      <table
                        role="presentation"
                        style="
                          border-collapse: collapse;
                          border: 0;
                          border-spacing: 0;
                        "
                      >
                        <tr>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a
                              href="http://www.twitter.com/"
                              style="color: #ffffff"
                              ><img
                                src="https://assets.codepen.io/210284/tw_1.png"
                                alt="Twitter"
                                width="38"
                                style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a
                              href="http://www.facebook.com/"
                              style="color: #ffffff"
                              ><img
                                src="https://assets.codepen.io/210284/fb_1.png"
                                alt="Facebook"
                                width="38"
                                style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                        </tr>
                      </table>
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
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Code to Reset Password at ${process.env.BRAND}`,
      },
    },
  }

  return emailTemplate
}

export const REGISTER = (email, name, token) => {
  const registerEmail = {
    Source: `Admin <${process.env.EMAIL_FROM}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
<!DOCTYPE html>
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
        background: #ffffff;
        background-color: #edece6;
      "
    >
      <tr>
        <td align="center" style="padding: 0">
          <table
            role="presentation"
            style="
              width: 602px;
              border-collapse: collapse;
              border: 1px solid #cccccc;
              border-spacing: 0;
              text-align: left;
            "
          >
            <tr>
              <td align="center">
                <img
                  src="${process.env.BANNER}"
                  alt=""
                  width="600"
                  style="height: auto; display: block"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 42px 30px">
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
                    <td style="padding: 0 0 36px 0; color: #153643">
                      <h1
                        style="
                          font-size: 24px;
                          margin: 0 0 20px 0;
                          font-family: Arial, sans-serif;
                        "
                      >
                        Welcome ${name} to LMS Learning
                      </h1>
                      <p
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        Thanks for joining LMS, We hope you find our courses
                        beneficial. you will be able to find all the lessons
                        once you login.
                      </p>
                      <p
                        style="
                          margin: 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >Please confirm you email here
                        <a
                          href="${process.env.URL}/api/confirmation/${token}"
                          style="color: #ee4c50; text-decoration: underline"
                          >${token}</a
                        >
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0">
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
                          <td
                            style="
                              width: 20px;
                              padding: 0;
                              font-size: 0;
                              line-height: 0;
                            "
                          >
                            &nbsp;
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee8d4c">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                    font-size: 9px;
                    font-family: Arial, sans-serif;
                  "
                >
                  <tr>
                    <td style="padding: 0; width: 50%" align="left">
                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          line-height: 16px;
                          font-family: Arial, sans-serif;
                          color: #ffffff;
                        "
                      >
                        &reg; Aimanskie, 2023
                      </p>
                    </td>
                    <td style="padding: 0; width: 50%" align="right">
                      <table
                        role="presentation"
                        style="
                          border-collapse: collapse;
                          border: 0;
                          border-spacing: 0;
                        "
                      >
                        <tr>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a
                              href="http://www.twitter.com/"
                              style="color: #ffffff"
                              ><img
                                src="https://assets.codepen.io/210284/tw_1.png"
                                alt="Twitter"
                                width="38"
                                style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a
                              href="http://www.facebook.com/"
                              style="color: #ffffff"
                              ><img
                                src="https://assets.codepen.io/210284/fb_1.png"
                                alt="Facebook"
                                width="38"
                                style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                        </tr>
                      </table>
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
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Welcome to ${process.env.BRAND}`,
      },
    },
  }
  return registerEmail
}

export const RESETPASSWORD = (email, name) => {
  const resetPassword = {
    Source: `Admin <${process.env.EMAIL_FROM}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
<h2>We would like to inform you that you have successfully changed your password, if you have not done so please let us know <a href='mailto:admin@assohwah.com>here</a></h2>
`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Reset Password at ${process.env.BRAND}`,
      },
    },
  }
  return resetPassword
}

export const CREATECOURSE = (email, name, title) => {
  const createCourse = {
    Source: `Admin <${process.env.EMAIL_FROM}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
          <html>
          <h1>Congrats you created a course titled <strong>${title}</strong> !</h1>
          </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Congrats in creating a course at ${process.env.BRAND}`,
      },
    },
  }
  return createCourse
}

export const PAIDCOURSE = (
  id,
  total,
  currency,
  { city, country, line1, line2, postal_code, state },
  email,
  userName,
  { name, image: { Location }, slug },
  date,
  transactionId
) => {
  const paidCourse = {
    Source: `Admin <${process.env.EMAIL_FROM}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
<!DOCTYPE html>
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
        background: #ffffff;
      "
    >
      <tr>
        <td align="center" style="padding: 0">
          <table
            role="presentation"
            style="
              width: 602px;
              border-collapse: collapse;
              border: 1px solid #cccccc;
              border-spacing: 0;
              text-align: left;
              background-color: #edece6;
            "
          >
            <tr>
              <td align="center">
                <img
                  src="${Location}"
                  alt=""
                  width="600"
                  style="height: auto; display: block"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 42px 30px">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                  "
                >
                <tbody><tr>
                  <td height="60" align="left" style="font-size:50px!important;line-height:60px;padding-top:15px;font-weight:bold">
                  Your order is confirmed
                  </td>
                  </tr>
                  
                  <tr>
                  <td align="left" style="font-size:24px;line-height:28px;padding-top:21px"> 
              
                 ${userName}, you’re set to start learning. Ready to jump in?
              
                  </td>
                  </tr>
                  <tbody><tr>
                    <td align="center" valign="top" style="padding:40px 0px 50px 0px">
                      <table cellpadding="0" cellspacing="0" border="0">
                      <tbody><tr>
                      <td align="center" valign="top" style="text-align:center;vertical-align:middle;background-color:#000000;height:50px">
                
                        <a href="${process.env.URL}/user/course/${slug}" style="background-color:#000000;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:28px;padding:12px 26px;text-align:center;text-decoration:none" target="_blank">Start learning</a>
                            
                </td>
                      </tr>
                      </tbody></table>
                    </td>
                        </tr>	
                    
                    </tbody>
                
                </tbody>
                <td bgcolor="f8f9fa" style="background-color:#f8f9fa;padding:48px 19px 8px 19px"><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                  <tbody><tr>
                    <td colspan="3" style="padding-bottom:24px" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" align="left">
                        <tbody>
                   <tr>
                           <td align="left" style="font-size:20px;line-height:20px;text-align:left;padding-right:40px;padding-top:5px">
    <strong>Transaction date:</strong>${date}</td>
                          </tr>
                        <tr>
                            <td align="left" style="font-size:20px;line-height:20px;text-align:left;padding-right:40px;padding-top:5px">
    <strong>Transaction number:</strong>AD-<wbr>${transactionId}</td>
                          </tr> 
                        </tbody>
                      </table></td>
                  </tr>
                  <tr>
                    
                  </tr>
                  <tr>
                    <td height="20" style="border-bottom:2px solid #000000"><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                        <tbody><tr>
                          <td width="298" height="29" align="left" valign="top" style="font-size:20px;font-weight:bold;letter-spacing:0;line-height:20px;height:35px">Course name</td>
                          <td valign="top" align="left" style="text-align:left"><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                              <tbody><tr>
                                <td width="110" height="29" align="left" valign="top" style="font-size:18px;line-height:20px;font-weight:bold;letter-spacing:0;min-width:90px"><strong>List price</strong></td>
                              </tr>
                            </tbody></table></td>
                          <td valign="top" align="left" style="text-align:left"><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                              <tbody><tr>
                                <td width="110" height="29" align="left" valign="top" style="font-size:18px;line-height:20px;font-weight:bold;letter-spacing:0;min-width:90px"><strong>Your price</strong></td>
                              </tr>
                            </tbody></table></td>
                        </tr>
                      </tbody></table></td>
                  </tr>
                  
                  <tr>
                    <td colspan="3"><table width="100%" cellpadding="0" cellspacing="0" align="center">
                        <tbody><tr>
                          <td height="10"></td>
                        </tr>
                      </tbody></table></td>
                  </tr>
                  <tr>
                    <td style="padding-top:10px;padding-bottom:20px"><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                        <tbody><tr>
                          <td width="297" valign="top" style="text-align:left;font-size:18px;font-weight:bold;letter-spacing:0;line-height:20px;word-wrap:break-word" align="left;">${name}</td>
                          <td width="109" valign="top" align="left" style="padding-top:20px"><table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody><tr>
                                <td align="right" style="padding-left:30px"><table width="225" cellpadding="0" cellspacing="0" border="0" role="presentation" align="right" style="min-width:170px">
                                    <tbody>
                                      <tr>
                                        <td width="80" height="20" valign="top" style="font-size:16px;line-height:20px;display:none;text-align:left;padding-right:15px!important"><strong></strong></td>
                                        <td width="56" align="left" style="font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;letter-spacing:0;line-height:20px;text-align:left"></td>
                                        <td width="80" height="20" valign="top" style="font-size:16px;line-height:20px;display:none;text-align:left;padding-right:15px!important"><strong>Price:</strong></td>
                                        <td width="56" align="left" style="font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;letter-spacing:0;line-height:20px;text-align:left">RM${total}</td>
                                      </tr>
                                    </tbody>
                                  </table></td>
                              </tr>
                            </tbody></table></td>
                        </tr>
                      </tbody></table></td>
                  </tr>
                  <tr>
                    <td><table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                        <tbody><tr>
                          <td height="10"></td>
                        </tr>
                      </tbody></table></td>
                  </tr>
                  <tr>
                    <td colspan="3" style="border-top:1px solid #0d0d0d;padding-bottom:30px;padding-top:15px" align="right"><table width="160" cellpadding="0" cellspacing="0" border="0" role="presentation" align="right">
                        <tbody>
                          
                         <tr>
                            <td height="20" valign="top" style="font-size:16px;line-height:20px;text-align:right;padding-right:18px!important"><strong>Total:</strong></td>
                            <td width="56" align="left" style="font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:18px;letter-spacing:0;line-height:20px;text-align:left">RM${total}</td>
                          </tr>
                        </tbody>
                      </table></td>
                  </tr>
                  <tr>
                    <td><table width="100%" cellpadding="0" cellspacing="0" align="center">
                      </table></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </tbody></table></td>
                    <tr class="m_-6625137005242829397hidden">
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                  <tr>
                    <td style="padding: 0">
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
                          <td
                            style="
                              width: 20px;
                              padding: 0;
                              font-size: 0;
                              line-height: 0;
                            "
                          >
                            &nbsp;
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee8d4c">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                    font-size: 9px;
                    font-family: Arial, sans-serif;
                  "
                >
                  <tr>
                    <td style="padding: 0; width: 50%" align="left">
                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          line-height: 16px;
                          font-family: Arial, sans-serif;
                          color: #ffffff;
                        "
                      >
                        &reg; Aimanskie, 2023
                      </p>
                    </td>
                    <td style="padding: 0; width: 50%" align="right">
                      <table
                        role="presentation"
                        style="
                          border-collapse: collapse;
                          border: 0;
                          border-spacing: 0;
                        "
                      >
                        <tr>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a
                              href="http://www.twitter.com/"
                              style="color: #ffffff"
                              ><img
                                src="https://assets.codepen.io/210284/tw_1.png"
                                alt="Twitter"
                                width="38"
                                style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a
                              href="http://www.facebook.com/"
                              style="color: #ffffff"
                              ><img
                                src="https://assets.codepen.io/210284/fb_1.png"
                                alt="Facebook"
                                width="38"
                                style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                        </tr>
                      </table>
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
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Congrats on your purchase!',
      },
    },
  }
  return paidCourse
}
