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
  type: {type: DataTypes.STRING, allowNull: false, defaultValue: 'пр.'},
  weekday: {type: DataTypes.INTEGER, allowNull: false},
  chis_znam: {type: DataTypes.STRING},
  subgroup: {type: DataTypes.STRING},
  id_group: {type: DataTypes.INTEGER, allowNull: false},
  id_teacher: {type: DataTypes.INTEGER, allowNull: false},
  date_read: {type: DataTypes.DATE}
})

const Session = sequelize.define('sessions', {
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

const dropLessonVies = `DROP VIEW IF EXISTS lesson_schedule;`

const dropSessionView = `DROP VIEW IF EXISTS session_schedule;`

const lessonView = `CREATE VIEW lesson_schedule AS 
  SELECT l.*, g.title as group_title, t.full_name FROM lessons l 
  INNER JOIN groups g ON (l.id_group = g.id_group) 
  INNER JOIN teachers t ON (l.id_teacher = t.id_teacher);`

const sessionView = `CREATE VIEW session_schedule AS 
  SELECT s.*, g.title as group_title, t.full_name FROM sessions s 
  INNER JOIN groups g ON (s.id_group = g.id_group) 
  INNER JOIN teachers t ON (s.id_teacher = t.id_teacher);`

sequelize.query(dropLessonVies)
  .then(() => {
    sequelize.query(lessonView)
  })
  .catch((error) => { console.log(error) })
  
sequelize.query(dropSessionView)
  .then(() => {
    sequelize.query(sessionView)
  })
  .catch((error) => { console.log(error) })

export { University, Faculty, Group, Teacher, Lesson, Session }