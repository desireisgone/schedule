import Router from 'express'
import universityController from '../controllers/universityController.js'
import facultyController from '../controllers/facultyController.js'
import groupController from '../controllers/groupController.js'
import teacherController from '../controllers/teacherController.js'
const router = new Router()

router.get('/universities', universityController.getAll)
router.get('/faculties/:id_university', facultyController.getById)
router.get('/groups/:id_faculty', groupController.getById)
router.get('/teachers', teacherController.getAll)
router.get('/lessons/:id_group')
router.get('/session/:id_group')

export default router