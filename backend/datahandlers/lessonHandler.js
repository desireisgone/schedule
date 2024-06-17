export function lessonByGroupHandler(data) {
  let lessonsBySubgroups = {}
  let mainSchedule = [[], [], [], [], [], []]
  data.forEach((lesson) => {
    if (lesson.subgroup !== '') {
      let key = lesson.start_time + lesson.weekday.toString() + lesson.chis_znam
      if (lessonsBySubgroups[key]) {
        lessonsBySubgroups[key].push(lesson)
      }
      else {
        lessonsBySubgroups[key] = [lesson]
        mainSchedule[lesson.weekday - 1].push(lesson)
      }
    }
    else {
      mainSchedule[lesson.weekday - 1].push(lesson)
    }
  })
  return { mainSchedule, lessonsBySubgroups }
}

export function lessonByTeacherHandler(data) {
  schedule = []
  usedKeys = Set()
  data.forEach((lesson) => {
    let key = lesson.start_time + lesson.weekday.toString() + lesson.chis_znam
    if (!usedKeys.has(key)) {
      schedule.push(lesson)
      usedKeys.push(key)
    }
  })
  return schedule
}