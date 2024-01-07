import sequelize from "../db.js"
import { DataTypes } from "sequelize"

// таблицы
const University = sequelize.define('universities', {
  id_university: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  title: {type: DataTypes.STRING, allowNull: false},
  city: {type: DataTypes.STRING}
})

const Faculty = sequelize.define('faculties', {
  id_faculty: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  title: {type: DataTypes.STRING, allowNull: false},
  id_university: {type: DataTypes.INTEGER, allowNull: false}
})

const Group = sequelize.define('groups', {
  id_group: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  title: {type: DataTypes.STRING, allowNull: false},
  id_faculty: {type: DataTypes.INTEGER, allowNull: false}
})

const Teacher = sequelize.define('teachers', {
  id_teacher: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  full_name: {type: DataTypes.STRING, allowNull: false}
})

const Lesson = sequelize.define('lessons', {
  id_lesson: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  title: {type: DataTypes.STRING, allowNull: false},
  place: {type: DataTypes.STRING, allowNull: false},
  start_time: {type: DataTypes.STRING, allowNull: false},
  end_time: {type: DataTypes.STRING, allowNull: false},
  type: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Пр'},
  weekday: {type: DataTypes.INTEGER, allowNull: false},
  chis_znam: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
  subgroup: {type: DataTypes.INTEGER},
  id_group: {type: DataTypes.INTEGER, allowNull: false},
  id_teacher: {type: DataTypes.INTEGER, allowNull: false}
})

const Session = sequelize.define('session', {
  id_exam: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  title: {type: DataTypes.STRING, allowNull: false},
  place: {type: DataTypes.STRING, allowNull: false},
  start_time: {type: DataTypes.STRING, allowNull: false},
  end_time: {type: DataTypes.STRING, allowNull: false},
  type: {type: DataTypes.STRING, allowNull: false},
  weekday: {type: DataTypes.INTEGER, allowNull: false},
  id_group: {type: DataTypes.INTEGER, allowNull: false},
  id_teacher: {type: DataTypes.INTEGER, allowNull: false}
})

// связи
University.hasMany(Faculty, {
  foreignKey: 'id_university'
})
Faculty.belongsTo(University, {
  foreignKey: 'id_university'
})

Faculty.hasMany(Group, {
  foreignKey: 'id_faculty'
})
Group.belongsTo(Faculty, {
  foreignKey: 'id_faculty'
})

Group.hasMany(Lesson, {
  foreignKey: 'id_group'
})
Lesson.belongsTo(Group, {
  foreignKey: 'id_group'
})

Teacher.hasMany(Lesson, {
  foreignKey: 'id_teacher'
})
Lesson.belongsTo(Teacher, {
  foreignKey: 'id_teacher'
})

Group.hasMany(Session, {
  foreignKey: 'id_group'
})
Session.belongsTo(Group, {
  foreignKey: 'id_group'
})

Teacher.hasMany(Session, {
  foreignKey: 'id_teacher'
})
Session.belongsTo(Teacher, {
  foreignKey: 'id_teacher'
})

export { University, Faculty, Group, Teacher, Lesson, Session }