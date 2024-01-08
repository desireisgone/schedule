import { University } from "../models/models.js"

class UniversityController {
  async getAll(req, res) {
    const universities = await University.findAll()
    return res.json(universities)
  }
}

export default new UniversityController()