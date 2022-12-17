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

export const REGISTER = (email, name) => {
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
                <html>
                  <h1>Welcome ${name.toUpperCase()}</h1>
                  <p>This is the best elearning website you will ever be in</p>
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
        Data: 'Welcome to EMS.COM',
      },
    },
  }
  return registerEmail
}

export const RESETPASSWORD = () => {
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
  courseId
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
          <p>${currency}${total}</p>
          <h2>Here is your details</h2>
          <h2>name - ${name}</h2>
          <h2>email - ${email}</h2>
          <h2>with title - ${courseId}</h2>
          <h2>payment id - ${id}</h2>
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
