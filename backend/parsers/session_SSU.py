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
        "session": data
    }

    # Записываем JSON в файл
    with open(f'session_{fac}_{group}_SSU.json', 'w', encoding='utf-8') as file:
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
        date = soup.find('fieldset', class_='do form_education form-wrapper')
        if date:
            links = date.find_all('a')

            # Извлекаем атрибут href из каждой ссылки
            for link in links:
                print('уснул на 15 сек')
                time.sleep(15)
                url_session = 'https://www.sgu.ru' + link.get('href') + '#session'
                get_session(url_session, key)


def get_session(url, fac):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    text = soup.find(class_='page-title').text
    group = re.search(r':\s*(.*)', text).group(1)
    table = soup.find(id='session')
    if table:
        rows = table.find_all('tr')
        session = {}
        session_dict = {}
        for row in rows:
            ses_list = row.find_all('td')
            if len(ses_list) == 4:
                session_dict = {}
                date_ses = ses_list[0].get_text(strip=True).replace('\xa0', ' ')
                time_ses = ses_list[1].get_text(strip=True)
                type_ses = ses_list[2].get_text(strip=True).replace(':', '')
                name_ses = ses_list[3].get_text(strip=True)
                session_dict["time"] = time_ses
                session_dict["type"] = type_ses
                session_dict["name"] = name_ses
                if date_ses != '':
                    session_date = date_ses.replace('.', '')
                    session[session_date] = []
            if len(ses_list) == 2 and "Преподаватель" in ses_list[0].get_text(strip=True):
                teacher = ses_list[1].get_text(strip=True)
                session_dict["teacher"] = teacher
            if len(ses_list) == 2 and "Место проведения" in ses_list[0].get_text(strip=True):
                place = ses_list[1].get_text(strip=True)
                session_dict["place"] = place
                session[session_date].append(session_dict)
        write_in_json(session, fac, group)
    else:
        message = soup.find('span', style='margin:10px').text
        write_in_json(message, fac, group)


if __name__ == "__main__":
    # Код здесь выполнится только при запуске скрипта напрямую, не при импорте как модуля
    global session_date
    take_schedule()
    # get_session('https://www.sgu.ru/schedule/bf/do/431#session', 'мех')
