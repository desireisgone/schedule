import { Sequelize } from "sequelize"
import sequelize from "../db.js"
import { lessonByGroupHandler, lessonByTeacherHandler } from "../datahandlers/lessonHandler.js"

class LessonController {
  async getByIdGroup(req, res) {
    const id_group = req.params.id_group
    const lessons = await sequelize.query(`SELECT * FROM lesson_schedule WHERE id_group = ${id_group} ORDER BY start_time;`, 
      { type: Sequelize.QueryTypes.SELECT })
    return res.json(lessonByGroupHandler(lessons))
  }

  async getByIdTeacher(req, res) {
    const id_teacher = req.params.id_teacher
    const lessons = await sequelize.query(`SELECT * FROM lesson_schedule WHERE id_teacher = ${id_teacher} ORDER BY start_time;`, 
      { type: Sequelize.QueryTypes.SELECT })
    return res.json(lessonByTeacherHandler(lessons))
  }
}

export default new LessonController()