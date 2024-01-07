import { Sequelize } from 'sequelize'

export default new Sequelize({
  dialect: "sqlite",
  storage: "schedule.db",
  define: {
    timestamps: false
  }
})