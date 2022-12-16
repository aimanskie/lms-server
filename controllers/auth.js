import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import AWS from 'aws-sdk'
import emailValidator from 'email-validator'
import { FORGOTPASSWORD, REGISTER, RESETPASSWORD } from '../utils/email.js'

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
}

const SES = new AWS.SES(awsConfig)

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name) return res.status(400).send('Name is required')
    if (password.length < 6) return res.status(400).send('Password should be minimum 6 characters long')
    if (emailValidator.validate(email)) {
      console.log('email is valid')
    } else {
      return res.status(400).send('Email not valid, try again')
    }

    let userExist = await User.findOne({ email }).exec()
    console.log(userExist)
    if (userExist) return res.status(400).send('Email is taken')

    const hashedPassword = await hashPassword(password)

    const user = new User({
      name,
      email,
      password: hashedPassword,
    })
    await user.save()

    await SES.sendEmail(REGISTER(email, name)).promise()
    return res.json({ ok: true })
  } catch (err) {
    return res.status(400).send('Error. Try again.')
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec()
    if (!user) return res.status(400).send('No user found')
    // check password
    const match = await comparePassword(password, user.password)
    if (!match) return res.status(400).send('Wrong password')

    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    // return user and token to client, exclude hashed password
    user.password = undefined
    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // only works on https
    })
    // send user as json response
    res.json(user)
  } catch (err) {
    return res.status(400).send('Error. Try again.')
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token')
    return res.json({ message: 'Signout success' })
  } catch (err) {
    console.log(err)
  }
}

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').exec()
    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
  }
}

export const currentUser1 = async (req, res) => {
  console.log('currentuser', req.query.id)
  try {
    if (req.query.id) {
      const user = await User.findById(req.query.id).exec()
      return res.json(user)
    } else {
      return res.json({ ok: true })
    }
  } catch (err) {
    console.log(err)
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const shortCode = nanoid(8).toUpperCase()
    const user = await User.findOneAndUpdate({ email }, { passwordResetCode: shortCode })
    if (!user) return res.status(400).send('User not found')

    await SES.sendEmail(FORGOTPASSWORD(email, shortCode)).promise()
    res.json({ ok: true })
  } catch (err) {
    console.log(err)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body
    const hashedPassword = await hashPassword(newPassword)
    const { name } = await User.findOneAndUpdate(
      {
        email,
        passwordResetCode: code,
      },
      {
        password: hashedPassword,
        passwordResetCode: '',
      }
    )
    await SES.sendEmail(RESETPASSWORD).promise()
    res.json({ ok: true })
  } catch (err) {
    return res.status(400).send('Error! Try again.')
  }
}
