import express from 'express'
import { requireSignin } from '../middlewares'
import { becomeInstructor, currentInstructor, instructorCourses, studentCount } from '../controllers/instructor.js'
const router = express.Router()

router.post('/make-instructor', requireSignin, becomeInstructor)
router.get('/current-instructor', requireSignin, currentInstructor)
router.get('/instructor-courses', requireSignin, instructorCourses)
router.post('/instructor/student-count', requireSignin, studentCount)

module.exports = router
