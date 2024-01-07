import { Teacher } from "../models/models.js"

class TeacherController {
  async getAll(req, res) {
    const teachers = await Teacher.findAll()
    return res.json(teachers)
  }
}

export default new TeacherController