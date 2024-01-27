import json
import time
import re
import requests
from datetime import datetime
from bs4 import BeautifulSoup


def processing_id_les(id_les, table):
    les_list = []
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    for les in id_les:
        day_of_week_idx = int(les[0]) - 1  # Индекс дня недели
        lesson_number = int(les[2])  # Номер пары

        # Проверяем, что индекс дня недели в допустимом диапазоне
        if 0 <= day_of_week_idx < len(days_of_week):
            day_of_week_name = days_of_week[day_of_week_idx]
        else:
            day_of_week_name = "Недопустимый день недели"

        # Получаем список времен начала и окончания занятий
        times = table.find_all('th')[7:]
        if 0 <= lesson_number - 1 < len(times):
            time_of_les = times[lesson_number - 1].text
            start_time = time_of_les[:5]
            end_time = time_of_les[5:]
            result_time = f"{start_time} - {end_time}"
        else:
            time_of_les = "Недопустимый номер пары"

        les_list.append(day_of_week_name)
        les_list.append(result_time)

    return les_list


def write_in_json(data, fac, group):
    schedule = {
        "universities": "Саратовский национальный исследовательский государственный университет имени Н. Г. Чернышевского",
        "faculty": fac,
        "groups": group,
        "date_read": str(datetime.now().date()),
        "schedule": {
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
        }
    }

    for i in range(len(data)):
        for j in range(len(data[i])):
            for x in range(len(data[i][j])):
                if x == 0:
                    current_day = data[i][j][x][0]

                    for a in range(len(data[i][j][4])):
                        if data[i][j][3][0] != '':
                            current_entry = {
                                "time": data[i][j][0][1],
                                "type": data[i][j][3][0],
                                "subgroup": data[i][j][2][a],
                                "chis/znam": data[i][j][1][a],
                                "name": data[i][j][4][a],
                                "teacher": data[i][j][5][a],
                                "place": data[i][j][6][a],
                            }
                            schedule["schedule"][current_day].append(current_entry)


    # Удаляем пустые списки для дней без расписания
    schedule = {day: entries for day, entries in schedule.items() if entries}

    # Записываем JSON в файл
    with open(f'schedule_{fac}_{group}_SSU.json', 'w', encoding='utf-8') as file:
        json.dump(schedule, file, ensure_ascii=False, indent=4)


def take_schedule():
    url = 'https://www.sgu.ru/schedule'
    dict_fac = {}
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    data = soup.find('div', class_='panes_item panes_item__type_group')
    links = data.select('a')
    for link in links:
        dict_fac[link.get_text()] = link.get('href')
    take_groups(dict_fac)


def take_groups(dict_fac):
    for key, value in dict_fac.items():
        time.sleep(15)
        url = 'https://www.sgu.ru' + value
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'lxml')
        date = soup.find('fieldset', class_='do form_education form-wrapper')
        if date:
            links = date.find_all('a')

            # Извлекаем атрибут href из каждой ссылки
            for link in links:
                time.sleep(15)
                url_schedule = 'https://www.sgu.ru' + link.get('href')
                get_schedule(url_schedule, key)


def get_schedule(url, fac):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    text = soup.find(class_='page-title').text
    group = re.search(r':\s*(.*)', text).group(1)
    table = soup.find(id='schedule')
    data = table.find_all('tr')
    schedule_list3 = []

    for j in range(1, 7):
        schedule_list1 = []
        for i in range(1, 9):
            for d in data:
                schedule_list2 = []
                id_les = f'{j}_{i}' # первое число это день недели, а второе число это номер пары
                day = d.find(id=f'{i}_{j}')
                if day is not None:
                    parity = day.find_all('div', class_='l-pr-r')  # чётность
                    type_les = day.find_all('div', class_='l-pr-t')  # практика или лекция
                    other = day.find_all('div', class_='l-pr-g')  # обычно подгруппа, но может быть и другое
                    name_les = day.find_all('div', class_='l-dn')  # название пары
                    place_les = day.find_all('div', class_='l-p')  # место пары
                    name_prepod = day.find_all('div', class_='l-tn') # фио препода

                    # Инициализируем переменные для хранения данных
                    id_les_list = []
                    parities_list = []
                    type_les_list = []
                    other_list = []
                    name_les_list = []
                    name_prepod_list = []
                    place_les_list = []

                    # Собираем данные в переменные
                    id_les_list.append(id_les)

                    for p in parity:
                        parities_list.append(p.text.strip())

                    for t_l in type_les:
                        type_les_list.append(t_l.text.strip())

                    for o in other:
                        other_list.append(o.text.strip())

                    for n_l in name_les:
                        name_les_list.append(n_l.text.strip())

                    for n_p in name_prepod:
                        name_prepod_list.append(n_p.text.strip())

                    for p in place_les:
                        place_les_list.append(p.text.strip())

                    # Выводим данные только если они не пустые
                    if id_les_list or parities_list or other_list or type_les_list or place_les_list or name_les_list:
                        if name_les_list:
                            schedule_list2.append(processing_id_les(id_les_list, table))
                            schedule_list2.append(parities_list)
                            schedule_list2.append(other_list)
                            schedule_list2.append(type_les_list)
                            schedule_list2.append(name_les_list)
                            schedule_list2.append(name_prepod_list)
                            schedule_list2.append(place_les_list)
                            schedule_list1.append(schedule_list2)

        schedule_list3.append(schedule_list1)
    write_in_json(schedule_list3, fac, group)


if __name__ == "__main__":
    # Код здесь выполнится только при запуске скрипта напрямую, не при импорте как модуля
    take_schedule()
