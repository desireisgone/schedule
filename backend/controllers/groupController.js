import { Group } from "../models/models.js"

class GroupController {
  async getById(req, res) {
    const id_faculty = req.params.id_faculty
    const groups = await Group.findAll({where: {id_faculty: id_faculty}})
    return res.json(groups)
  }
}

export default new GroupController()