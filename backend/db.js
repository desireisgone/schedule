const {Sequelize} = require('sequelize')

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "schedule.db",
  define: {
    timestamps: false
  }
})