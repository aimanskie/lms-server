import User from '../models/user.js'
import { hashPassword, comparePassword } from '../utils/auth.js'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import AWS from 'aws-sdk'
import emailValidator from 'email-validator'
import { FORGOTPASSWORD, REGISTER, RESETPASSWORD } from '../utils/email.js'
import Timeout from 'smart-timeout'

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
    } else {
      return res.status(400).send('Email not valid, try again')
    }
    let userExist = await User.findOne({ email }).exec()
    if (userExist) {
      return res.status(400).send('Email is taken')
    }
    const hashedPassword = await hashPassword(password)
    const token = jwt.sign({ _id: nanoid(10) }, process.env.JWT_SECRET, {
      expiresIn: '1m',
    })
    const user = new User({
      name,
      email,
      password: hashedPassword,
      token,
      checking: false,
    })
    await user.save()

    await SES.sendEmail(REGISTER(email, name, token)).promise()
    return res.json({ ok: true })
  } catch (err) {
    return res.status(400).send('Error. Try again.')
  }
}

export const confirm = async (req, res, next) => {
  const token = req.params.token
  const tokenUser = await User.findOneAndUpdate({ token }, { checking: true })
  Timeout.clear('original_timeout')
  if (tokenUser) {
    return res.redirect(`${process.env.URL}/login`)
  }
  res.redirect(`${process.env.URL}/register`)
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ checking: true, email }).exec()
    if (!user) return res.status(400).send('No user found')
    const match = await comparePassword(password, user.password)
    if (!match) return res.status(400).send('Wrong password')

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    user.password = undefined
    res.cookie('token', token, {
      httpOnly: true,
    })
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
    await SES.sendEmail(FORGOTPASSWORD(email, shortCode, user.name)).promise()
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
    await SES.sendEmail(RESETPASSWORD(email, name)).promise()
    res.json({ ok: true })
  } catch (err) {
    return res.status(400).send('Error! Try again.')
  }
}
