import { Sequelize } from "sequelize"
import sequelize from "../db.js"

class SessionController {
  async getByIdGroup(req, res) {
    const id_group = req.params.id_group
    const lessons = await sequelize.query(`SELECT * FROM session_schedule WHERE id_group = ${id_group};`, 
      { type: Sequelize.QueryTypes.SELECT })
    return res.json(lessons)
  }

  async getByIdTeacher(req, res) {
    const id_teacher = req.params.id_teacher
    const lessons = await sequelize.query(`SELECT * FROM session_schedule WHERE id_teacher = ${id_teacher};`, 
      { type: Sequelize.QueryTypes.SELECT })
    return res.json(lessons)
  }
}

export default new SessionController()