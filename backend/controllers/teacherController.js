import { Teacher } from "../models/models.js"

class TeacherController {
  async getAll(req, res) {
    const teachers = await Teacher.findAll()
    return res.json(teachers)
  }
  async getById(req, res) {
    const id_teacher = req.params.id_teacher
    const teacher = await Teacher.findByPk(id_teacher)
    return res.json(teacher)
  }
}

export default new TeacherController