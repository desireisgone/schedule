import { Faculty } from '../models/models.js'

class FacultyController {
  async getById(req, res) {
    const id_university = req.params.id_university
    const faculties = await Faculty.findAll({where: {id_university: id_university}})
    return res.json(faculties) 
  }
}

export default new FacultyController()