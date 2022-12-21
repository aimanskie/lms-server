import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'
import Course from '../models/course'
import Completed from '../models/completed'
import slugify from 'slugify'
import { readFileSync } from 'fs'
import User from '../models/user'
const stripe = require('stripe')(process.env.STRIPE_SECRET)
import { CREATECOURSE, PAIDCOURSE } from '../utils/email.js'

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
}

const S3 = new AWS.S3(awsConfig)
const SES = new AWS.SES(awsConfig)

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body
    if (!image) return res.status(400).send('No image')
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    const type = image.split(';')[0].split('/')[1]
    const params = {
      Bucket: 'ems-dev',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    }

    S3.upload(params, (err, data) => {
      if (err) {
        return res.sendStatus(400)
      }
      res.send(data)
    })
  } catch (err) {
    res.send(400).json({ error: 'error problem' })
  }
}

export const removeImage = async (req, res) => {
  try {
    const { image } = req.body
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    }

    S3.deleteObject(params, (err, data) => {
      if (err) {
        res.sendStatus(400)
      }
      res.send({ ok: true })
    })
  } catch (err) {
    console.log(err)
  }
}

export const create = async (req, res) => {
  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    })
    if (alreadyExist) return res.status(400).send('Title is taken')

    const course = await new Course({
      slug: slugify(req.body.name),
      instructor: req.user._id,
      ...req.body,
    }).save()

    const { email, name } = await User.findOne({ _id: req.user._id })
    console.log(email, name)

    await SES.sendEmail(CREATECOURSE(email, name, req.body.name)).promise()
    res.json(course)
  } catch (err) {
    return res.status(400).send('Course create failed. Try again.')
  }
}

export const read = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate('instructor', '_id name').exec()
    res.json(course)
  } catch (err) {
    console.log(err)
  }
}

export const uploadVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(400).send('Unauthorized')
    }

    const { video } = req.files
    if (!video) return res.status(400).send('No video')

    const params = {
      Bucket: 'ems-dev',
      Key: `${nanoid()}.${video.type.split('/')[1]}`,
      Body: readFileSync(video.path),
      ACL: 'public-read',
      ContentType: video.type,
    }

    S3.upload(params, (err, data) => {
      if (err) {
        res.sendStatus(400)
      }
      res.send(data)
    })
  } catch (err) {
    console.log(err)
  }
}

export const removeVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(400).send('Unauthorized')
    }

    const { Bucket, Key } = req.body
    const params = {
      Bucket,
      Key,
    }

    S3.deleteObject(params, (err, data) => {
      if (err) {
        res.sendStatus(400)
      }
      res.send({ ok: true })
    })
  } catch (err) {
    console.log(err)
  }
}

export const addLesson = async (req, res) => {
  try {
    const { slug, instructorId } = req.params
    const { title, content, video } = req.body

    if (req.user._id != instructorId) {
      return res.status(400).send('Unauthorized')
    }

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    )
      .populate('instructor', '_id name')
      .exec()
    res.json(updated)
  } catch (err) {
    return res.status(400).send('Add lesson failed')
  }
}

export const update = async (req, res) => {
  try {
    const { slug } = req.params
    const course = await Course.findOne({ slug }).exec()
    if (req.user._id != course.instructor) {
      return res.status(400).send('Unauthorized')
    }

    const updated = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec()

    res.json(updated)
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export const removeLesson = async (req, res) => {
  const { slug, lessonId } = req.params
  const course = await Course.findOne({ slug }).exec()
  if (req.user._id != course.instructor) {
    return res.status(400).send('Unauthorized')
  }

  const deletedCourse = await Course.findByIdAndUpdate(course._id, {
    $pull: { lessons: { _id: lessonId } },
  }).exec()

  res.json({ ok: true })
}

export const updateLesson = async (req, res) => {
  try {
    const { slug } = req.params
    const { _id, title, content, video, free_preview } = req.body
    const course = await Course.findOne({ slug }).select('instructor').exec()

    if (course.instructor._id != req.user._id) {
      return res.status(400).send('Unauthorized')
    }

    const updated = await Course.updateOne(
      { 'lessons._id': _id },
      {
        $set: {
          'lessons.$.title': title,
          'lessons.$.content': content,
          'lessons.$.video': video,
          'lessons.$.free_preview': free_preview,
        },
      },
      { new: true }
    ).exec()
    res.json({ ok: true })
  } catch (err) {
    return res.status(400).send('Update lesson failed')
  }
}

export const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const course = await Course.findById(courseId).select('instructor').exec()

    if (course.instructor._id != req.user._id) {
      return res.status(400).send('Unauthorized')
    }

    const updated = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true }).exec()
    res.json(updated)
  } catch (err) {
    return res.status(400).send('Publish course failed')
  }
}

export const unpublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const course = await Course.findById(courseId).select('instructor').exec()

    if (course.instructor._id != req.user._id) {
      return res.status(400).send('Unauthorized')
    }

    const updated = await Course.findByIdAndUpdate(courseId, { published: false }, { new: true }).exec()
    res.json(updated)
  } catch (err) {
    return res.status(400).send('Unpublish course failed')
  }
}

export const courses = async (req, res) => {
  const all = await Course.find({ published: true }).populate('instructor', '_id name').exec()
  // const user = await User.
  res.json(all)
}

export const checkEnrollment = async (req, res) => {
  const { courseId } = req.params
  const user = await User.findById(req.user._id).exec()
  let ids = []
  let length = user.courses && user.courses.length
  for (let i = 0; i < length; i++) {
    ids.push(user.courses[i].toString())
  }
  res.json({
    status: ids.includes(courseId),
    course: await Course.findById(courseId).exec(),
  })
}

export const freeEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).exec()
    if (course.paid) return

    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { courses: course._id },
      },
      { new: true }
    ).exec()
    res.json({
      message: 'Congratulations! You have successfully enrolled',
      course,
    })
  } catch (err) {
    return res.status(400).send('Enrollment create failed')
  }
}

export const paidEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('instructor').exec()
    if (!course.paid) return
    // const fee = (course.price * 30) / 100
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'fpx'],
      line_items: [
        {
          name: course.name,
          amount: Math.round(course.price.toFixed(2) * 100),
          currency: 'myr',
          quantity: 1,
        },
      ],
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${course._id}`,
      // success_url: `http://assohwah.com/stripe/success/${course._id}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      // cancel_url: 'http://assohwah.com/stripe/cancel',
    })
    await User.findByIdAndUpdate(req.user._id, {
      stripeSession: session,
    }).exec()
    res.send(session.id)
  } catch (err) {
    return res.status(400).send('Enrollment create failed')
  }
}

export const stripeSuccess = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).exec()
    const user = await User.findById(req.user._id).exec()
    if (!user.stripeSession.id) return res.sendStatus(400)
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id)
    console.log(course)
    if (session.payment_status === 'paid') {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { courses: course._id },
        $set: { stripeSession: {} },
      }).exec()
      const {
        id,
        amount_total,
        currency,
        customer_details: { address, email, name },
        created,
        payment_intent,
      } = session

      let date = new Date(created * 1000).toJSON().slice(0, 10).split('-').reverse().join('/')

      await SES.sendEmail(
        PAIDCOURSE(id, amount_total, currency, address, email, name, course, date, payment_intent)
      ).promise()
    }

    res.json({ success: true, course })
  } catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export const userCourses = async (req, res) => {
  const user = await User.findById(req.user._id).exec()
  const courses = await Course.find({ _id: { $in: user.courses } })
    .populate('instructor', '_id name')
    .exec()
  res.json(courses)
}

export const markCompleted = async (req, res) => {
  const { courseId, lessonId } = req.body
  const existing = await Completed.findOne({
    user: req.user._id,
    course: courseId,
  }).exec()
  if (!existing) {
    const created = await new Completed({
      user: req.user._id,
      course: courseId,
      lessons: lessonId,
    }).save()
    res.json({ created })
  }
  if (existing) {
    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $addToSet: { lessons: lessonId },
      }
    )
    res.json(updated)
  }
}

export const listCompleted = async (req, res) => {
  try {
    const list = await Completed.findOne({
      user: req.user._id,
      course: req.body.courseId,
    }).exec()
    list && res.json(list.lessons)
  } catch (err) {
    console.log(err)
  }
}

export const markIncomplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body

    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $pull: { lessons: lessonId },
      }
    ).exec()
    res.json({ ok: true })
  } catch (err) {
    console.log(err)
  }
}
