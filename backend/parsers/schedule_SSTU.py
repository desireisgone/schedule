import json
import time
import re
import requests
from datetime import datetime
from bs4 import BeautifulSoup


# def processing_id_les(id_les, table):
#     les_list = []
#     days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
#
#     for les in id_les:
#         day_of_week_idx = int(les[0]) - 1  # Индекс дня недели
#         lesson_number = int(les[2])  # Номер пары
#
#         # Проверяем, что индекс дня недели в допустимом диапазоне
#         if 0 <= day_of_week_idx < len(days_of_week):
#             day_of_week_name = days_of_week[day_of_week_idx]
#         else:
#             day_of_week_name = "Недопустимый день недели"
#
#         # Получаем список времен начала и окончания занятий
#         times = table.find_all('th')[7:]
#         if 0 <= lesson_number - 1 < len(times):
#             time_of_les = times[lesson_number - 1].text
#             start_time = time_of_les[:5]
#             end_time = time_of_les[5:]
#             result_time = f"{start_time} - {end_time}"
#         else:
#             time_of_les = "Недопустимый номер пары"
#
#         les_list.append(day_of_week_name)
#         les_list.append(result_time)
#
#     return les_list


# def write_in_json(data, fac, group):
#     schedule = {
#         "universities": "Саратовский Государственный Технический университет имени Гагарина Ю.А.",
#         "faculty": fac,
#         "groups": group,
#         "date_read": str(datetime.now().date()),
#         "schedule": {
#             "Monday": [],
#             "Tuesday": [],
#             "Wednesday": [],
#             "Thursday": [],
#             "Friday": [],
#             "Saturday": [],
#         }
#     }
#
#     for i in range(len(data)):
#         for j in range(len(data[i])):
#             for x in range(len(data[i][j])):
#                 if x == 0:
#                     current_day = data[i][j][x][0]
#
#                     for a in range(len(data[i][j][4])):
#                         if data[i][j][3][0] != '':
#                             current_entry = {
#                                 "time": data[i][j][0][1],
#                                 "type": data[i][j][3][0],
#                                 "subgroup": data[i][j][2][a],
#                                 "chis/znam": data[i][j][1][a],
#                                 "name": data[i][j][4][a],
#                                 "teacher": data[i][j][5][a],
#                                 "place": data[i][j][6][a],
#                             }
#                             schedule["schedule"][current_day].append(current_entry)
#
#
#     # Удаляем пустые списки для дней без расписания
#     schedule = {day: entries for day, entries in schedule.items() if entries}
#
#     # Преобразуем словарь в JSON
#     json_schedule = json.dumps(schedule, ensure_ascii=False, indent=4)
#
#     # Записываем JSON в файл
#     with open(f'schedule_{fac}_{group}.json', 'w', encoding='utf-8') as file:
#         file.write(json_schedule)


def take_schedule():
    url = 'https://rasp.sstu.ru'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    data = soup.find('div', id='raspStructure')
    schedule_blocks = data.find_all('div', class_='card')
    for block in schedule_blocks:
        fac = block.find('div', class_='institute collapsed').text.strip()
        row_groups = block.find_all('div', class_='col-auto group')
        for group in row_groups:
            name_group = group.text
            link = 'https://rasp.sstu.ru' + group.find('a').get('href')
            get_schedule(link, fac, name_group)


def get_schedule(url, fac, name_group):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    session = soup.find(class_='lesson-warnings').text
    print(session)
    weeks = soup.find_all('div', class_='week')

    for week in weeks:
        days = week.find_all(class_='day')
        for day in days[1:]:
            weekday = day.find('div', class_='day-header').text[:-5]
            print(weekday)
            date_weekday = day.find('div', class_='day-header').text[-5:]
            print(date_weekday)
            lessons = day.find_all(class_='day-lesson')
            for lesson in lessons:
                lesson_hour = lesson.find('div', class_='lesson-hour')
                place = lesson.find('div', class_='lesson-room')
                les_name = lesson.find('div', class_='lesson-name')
                les_type = lesson.find('div', class_='lesson-type')
                teacher = lesson.find('div', class_='lesson-teacher')
                if lesson_hour and place and les_name and les_type and teacher:
                    lesson_hour = lesson_hour.text.replace('—', '')
                    place = lesson.find('div', class_='lesson-room').text
                    les_name = lesson.find('div', class_='lesson-name').text
                    les_type = lesson.find('div', class_='lesson-type').text
                    teacher = lesson.find('div', class_='lesson-teacher').text
                else:
                    lesson_hour = '-'
                    place = '-'
                    les_name = '-'
                    les_type = '-'
                    teacher = '-'
                print(lesson_hour, place, les_name, les_type, teacher)


if __name__ == "__main__":
    # Код здесь выполнится только при запуске скрипта напрямую, не при импорте как модуля
    take_schedule()
