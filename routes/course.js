import express from 'express'
import formidable from 'express-formidable'
import { requireSignin, isInstructor, isEnrolled, isAdmin } from '../middlewares'
import {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
  removeLesson,
  updateLesson,
  publishCourse,
  unpublishCourse,
  courses,
  checkEnrollment,
  freeEnrollment,
  paidEnrollment,
  stripeSuccess,
  userCourses,
  markCompleted,
  listCompleted,
  markIncomplete,
  allUsers,
  uploadPdf,
  removePdf,
} from '../controllers/course.js'
const router = express.Router()

router.get('/courses', courses)

router.post('/course/upload-image', uploadImage)
router.post('/course/remove-image', removeImage)

router.post('/course', requireSignin, isInstructor, create)
router.put('/course/:slug', requireSignin, update)
router.get('/course/:slug', read)
router.post(
  '/course/video-upload/:instructorId',
  requireSignin,
  formidable({ maxFileSize: 500 * 1024 * 1024 }),
  uploadVideo
)
router.post(
  '/course/pdf-upload/:instructorId',
  requireSignin,
  formidable({ maxFileSize: 500 * 1024 * 1024 }),
  uploadPdf
)
router.post('/course/video-remove/:instructorId', requireSignin, removeVideo)
router.post('/course/pdf-remove/:instructorId', requireSignin, removePdf)

router.put('/course/publish/:courseId', requireSignin, publishCourse)
router.put('/course/unpublish/:courseId', requireSignin, unpublishCourse)

router.post('/course/lesson/:slug/:instructorId', requireSignin, addLesson)
router.put('/course/lesson/:slug/:instructorId', requireSignin, updateLesson)
router.put('/course/:slug/:lessonId', requireSignin, removeLesson)

router.get('/check-enrollment/:courseId', requireSignin, checkEnrollment)

router.post('/free-enrollment/:courseId', requireSignin, freeEnrollment)
router.post('/paid-enrollment/:courseId', requireSignin, paidEnrollment)
router.get('/stripe-success/:courseId', requireSignin, stripeSuccess)

router.get('/user-courses', requireSignin, userCourses)
router.get('/user/course/:slug', requireSignin, isEnrolled, read)
router.get('/user', requireSignin, isAdmin, allUsers)

router.post('/mark-completed', requireSignin, markCompleted)
router.post('/list-completed', requireSignin, listCompleted)
router.post('/mark-incomplete', requireSignin, markIncomplete)

module.exports = router
