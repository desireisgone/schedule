import json
import time
import re
import requests
from datetime import datetime
from bs4 import BeautifulSoup


def write_in_json(data, fac, group):
    session = {
        "universities": "Саратовский национальный исследовательский государственный университет имени Н. Г. Чернышевского",
        "faculty": fac,
        "groups": group,
        "date_read": str(datetime.now().date()),
        "zaoch_schedule": data
    }

    # Записываем JSON в файл
    with open(f'zaoch_schedule_{fac}_{group}_SSU.json', 'w', encoding='utf-8') as file:
        json.dump(session, file, ensure_ascii=False, indent=4)


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
        date = soup.find('fieldset', class_='zo form_education form-wrapper')
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
    table = soup.find('table')
    if table:
        rows = table.find_all('tr')
        schedule = {}
        for row in rows:
            schedule_dict = {}
            info = row.find_all('td')
            date_les = info[0].text
            time_les = info[1].text
            schedule[date_les] = []
            pattern = r'([^<td>]*?):(.*?)<br/> Преподаватель: (.*?)<br/> Место проведения: (.*?)<br/>'
            matches = re.finditer(pattern, str(info[2]))
            for match in matches:
                type_les = match.group(1)
                name_les = match.group(2)
                teacher = match.group(3)
                place = match.group(4)
                schedule_dict["time"] = time_les
                schedule_dict["type"] = type_les
                schedule_dict["name"] = name_les
                schedule_dict["teacher"] = teacher
                schedule_dict["place"] = place
                schedule[date_les].append(schedule_dict)
        write_in_json(schedule, fac, group)
    else:
        message = soup.find('span', style='margin:10px').text
        write_in_json(message, fac, group)


if __name__ == "__main__":
    # Код здесь выполнится только при запуске скрипта напрямую, не при импорте как модуля
    take_schedule()
