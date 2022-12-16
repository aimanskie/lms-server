import User from '../models/user'
import Course from '../models/course'
import AWS from 'aws-sdk'

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
}

const SES = new AWS.SES(awsConfig)

export const becomeInstructor = async (req, res) => {
  try {
    const { bank, bankAccount } = req.body
    const user = await User.findById(req.user._id).exec()
    if (!user) {
      return res.staus(401).send('Unauthorized')
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          bank: bank,
          bankAccount: bankAccount,
          $addToSet: { role: 'Instructor' },
        },
        { new: true }
      )
      res.json(statusUpdated)
    }
  } catch (err) {
    console.log(err)
  }
}

export const currentInstructor = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select('-password').exec()
    if (!(user.role.includes('Admin') || user.role.includes('Instructor'))) {
      return res.sendStatus(403)
    } else {
      res.json({ ok: true })
    }
  } catch (err) {
    console.log(err)
  }
}

export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 }).exec()
    res.json(courses)
  } catch (err) {
    console.log(err)
  }
}

export const studentCount = async (req, res) => {
  try {
    const users = await User.find({ courses: req.body.courseId }).select('_id').exec()
    res.json(users)
  } catch (err) {
    console.log(err)
  }
}
