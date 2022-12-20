require('dotenv').config()

const TEMPLATE = () => {
  return `
             <!DOCTYPE html>
                <html
                lang="en"
                >
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="x-apple-disable-message-reformatting" />
                <title>Online Learning</title>

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
            "
          >
            <tr>
              <td
                align="center"
                style="padding: 40px 0 30px 0; background: #70bbd9"
              >
                <img
                  src="https://assets.codepen.io/210284/h1.png"
                  alt=""
                  width="300"
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
                        Welcome LMS Learning
                      </h1>
                      <p
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        Welcome ${name} to Online School. Thank you for your registration, please confirm you email buy clicking on the link here. Thank you!
                      </p>
                      <p
                        style="
                          margin: 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                      click here 
                        <a href=${process.env.URL}/api/confirmation/${token}>${token}</a> 
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee4c50">
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
                        &reg; Aimanskie, 2023<br /><a
                          href="http://www.example.com"
                          style="color: #ffffff; text-decoration: underline"
                          >Unsubscribe</a
                        >
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
</html>`
}

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
                <html>
                  <h1>Reset password</h1>
                  <p>User this code to reset your password</p>
                  <h2 style="color:red;">${shortCode}</h2>
                  <i>EMS.com</i>
                </html>
              `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Reset Password',
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
                >
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="x-apple-disable-message-reformatting" />
                <title>Online Learning</title>

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
            "
          >
            <tr>
              <td
                align="center"
                style="padding: 40px 0 30px 0; background: #70bbd9"
              >
                <img
                  src="https://assets.codepen.io/210284/h1.png"
                  alt=""
                  width="300"
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
                        Welcome LMS Learning
                      </h1>
                      <p
                        style="
                          margin: 0 0 12px 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                        Welcome ${name} to Online School. Thank you for your registration, please confirm you email buy clicking on the link here. Thank you!
                      </p>
                      <p
                        style="
                          margin: 0;
                          font-size: 16px;
                          line-height: 24px;
                          font-family: Arial, sans-serif;
                        "
                      >
                      click here 
                        <a href=${process.env.URL}/api/confirmation/${token}>${token}</a> 
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee4c50">
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
                        &reg; Aimanskie, 2023<br /><a
                          href="http://www.example.com"
                          style="color: #ffffff; text-decoration: underline"
                          >Unsubscribe</a
                        >
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
        Data: 'Welcome to assohwah.com',
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
          <html>
          <h1>Welcome ${name.toUpperCase()}</h1>
          <p>You just updated your password</p>
          <h2>Here is your details</h2>
          <h2>name - ${name}</h2>
          <h2>email - ${email}</h2>
          <i>ems.com</i>
          </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Reset Password at EMS.COM',
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
          <h1>Congrats you created a course! ${name.toUpperCase()}</h1>
          <p>You just updated your password</p>
          <h2>Here is your details</h2>
          <h2>name - ${name}</h2>
          <h2>email - ${email}</h2>
          <h2>with title - ${title}
          <p>Now you can go and add lessons!</p>
          <i>ems.com</i>
          </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Congrats in creating a course at EMS.COM',
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
  name,
  { description, image: { Location } }
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
          <html>
          <h1>Congrats you created a course! ${name.toUpperCase()}</h1>
          <p>You just updated your password</p>
          <p>${currency}${total / 100}</p>
          <h2>Here is your details</h2>
          <h2>name - ${name}</h2>
          <h2>email - ${email}</h2>
          <h2>with title - ${description}</h2>
          <h2>payment id - ${id}</h2>
          <img src=${Location}>Course Image ${Location}</img>

          <h2>Address</h2>
          <p>City - ${city}</p>
          <p>Street - ${line1}${line2}</p>
          <p>Poscode - ${postal_code}</p>
          <p>State - ${state}</p>
          <p>Country - ${country}</p>
          <p>Now you can go and add lessons!</p>
          <i>ems.com</i>
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
