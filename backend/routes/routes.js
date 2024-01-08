import Router from 'express'
import universityController from '../controllers/universityController.js'
import facultyController from '../controllers/facultyController.js'
import groupController from '../controllers/groupController.js'
import teacherController from '../controllers/teacherController.js'
import lessonController from '../controllers/lessonController.js'
import sessionController from '../controllers/sessionController.js'
const router = new Router()

router.get('/universities', universityController.getAll)
router.get('/faculties/:id_university', facultyController.getById)
router.get('/groups/:id_faculty', groupController.getById)
router.get('/teachers', teacherController.getAll)
router.get('/teachers/:id_teacher', teacherController.getById)
router.get('/lessons/byTeacher/:id_teacher', lessonController.getByIdTeacher)
router.get('/lessons/byGroup/:id_group', lessonController.getByIdGroup)
router.get('/session/byTeacher/:id_teacher', sessionController.getByIdTeacher)
router.get('/session/byGroup/:id_group', sessionController.getByIdGroup)

export default router