package org.example;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.Map;



public class InsertData {

    public static void main(String[] args) {
        try {
            // Подключение к базе данных SQLite
            Class.forName("org.sqlite.JDBC");
            String url = "jdbc:sqlite:schedule_bd.db"; //C:\Program Files\SQLiteStudio\schedule
            Connection connection = DriverManager.getConnection(url);

            // JSON-данные
            JsonObject jsonObject = JsonParser.parseReader(new FileReader("C:\\SQL2022\\1.json")).getAsJsonObject();

            // Вставка университета
            insertUniversity(connection, jsonObject.get("universities").getAsString());

            // Вставка факультета
            insertFaculty(connection, jsonObject.get("faculty").getAsString(), jsonObject.get("universities").getAsString());

            // Вставка группы
            insertGroup(connection, jsonObject.get("groups").getAsString(), jsonObject.get("faculty").getAsString());

            // Вставка преподавателей
            JsonElement scheduleElement = jsonObject.get("schedule");
            if (scheduleElement != null && scheduleElement.isJsonObject()) {
                JsonObject scheduleObject = scheduleElement.getAsJsonObject();
                insertTeachers(connection, scheduleObject);
            } else {
                System.err.println("Ошибка: Ключ 'schedule' не найден в JSON.");
            }

            // Вставка расписания
            insertLesson(connection, jsonObject.getAsJsonObject("schedule"), jsonObject.get("groups").getAsString());

            // Закрываем соединение
            connection.close();
        } catch (ClassNotFoundException | SQLException | IOException e) {
            e.printStackTrace();
        }
    }
        private static void insertUniversity(Connection connection, String university) throws SQLException {
        // Проверка, существует ли университет
        String checkQuery = "SELECT * FROM universities WHERE title = ?";
        try (PreparedStatement checkStatement = connection.prepareStatement(checkQuery)) {
            checkStatement.setString(1, university);
            if (checkStatement.executeQuery().next()) {
                // Университет уже существует, ничего не делаем
                return;
            }
        }

        // Вставка университета, если его нет
        String insertQuery = "INSERT INTO universities (title, city) VALUES (?, ?)";
        try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
            insertStatement.setString(1, university);
            // Информация о городах отсутствует
            insertStatement.setString(2, "Город");
            insertStatement.executeUpdate();
        }
    }

    private static void insertFaculty(Connection connection, String faculty, String university) throws SQLException {
        // Проверка, существует ли факультет
        String checkQuery = "SELECT * FROM faculty WHERE title = ? AND id_universities = (SELECT id_universities FROM universities WHERE title = ?)";
        try (PreparedStatement checkStatement = connection.prepareStatement(checkQuery)) {
            checkStatement.setString(1, faculty);
            checkStatement.setString(2, university);
            if (checkStatement.executeQuery().next()) {
                // Факультет уже существует, ничего не делаем
                return;
            }
        }

        // Вставка факультета, если его нет
        String insertQuery = "INSERT INTO faculty (title, id_universities) VALUES (?, (SELECT id_universities FROM universities WHERE title = ?))";
        try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
            insertStatement.setString(1, faculty);
            insertStatement.setString(2, university);
            insertStatement.executeUpdate();
        }
    }

    private static void insertGroup(Connection connection, String group, String faculty) throws SQLException {
        // Проверка, существует ли группа
        String checkQuery = "SELECT * FROM groups WHERE title = ? AND id_faculty = (SELECT id_faculty FROM faculty WHERE title = ?)";
        try (PreparedStatement checkStatement = connection.prepareStatement(checkQuery)) {
            checkStatement.setString(1, group);
            checkStatement.setString(2, faculty);
            if (checkStatement.executeQuery().next()) {
                // Группа уже существует, ничего не делаем
                return;
            }
        }

        // Вставка группы, если её нет
        String insertQuery = "INSERT INTO groups (title, id_faculty) VALUES (?, (SELECT id_faculty FROM faculty WHERE title = ?))";
        try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
            insertStatement.setString(1, group);
            insertStatement.setString(2, faculty);
            insertStatement.executeUpdate();
        }
    }

    private static void insertTeachers(Connection connection, JsonObject scheduleObject) throws SQLException {
        String query = "INSERT INTO teachers (full_name) VALUES (?)";
        for (Map.Entry<String, JsonElement> dayEntry : scheduleObject.entrySet()) {
            JsonArray lessons = dayEntry.getValue().getAsJsonArray();

            for (JsonElement lessonElement : lessons) {
                if (lessonElement.isJsonObject()) {
                    JsonObject lessonObject = lessonElement.getAsJsonObject();

                    // Получение имя преподавателя из поля "teacher"
                    String teacherName = lessonObject.get("teacher").getAsString();

                    try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                        preparedStatement.setString(1, teacherName);
                        preparedStatement.executeUpdate();
                    }
                }
            }
        }
    }

    private static void insertLesson(Connection connection, JsonObject scheduleObject, String groupName) throws SQLException {
        for (Map.Entry<String, JsonElement> entry : scheduleObject.entrySet()) {
            String dayName = entry.getKey();
            int weekday = getWeekday(dayName);

            JsonArray lessons = entry.getValue().getAsJsonArray();

            for (JsonElement lesson : lessons) {
                JsonObject lessonObject = lesson.getAsJsonObject();

                // Получение id преподавателя по ФИО
                int id_teacher = getTeacherId(connection, lessonObject.get("teacher").getAsString());

                // Получение id группы
                int id_groups = getGroupId(connection, groupName.trim());

                // Получение данных из JSON
                String place = lessonObject.has("place") ? lessonObject.get("place").getAsString() : "";
                String title = lessonObject.has("name") ? lessonObject.get("name").getAsString() : "";
                String startTime = lessonObject.has("time") ? lessonObject.get("time").getAsString().split(" - ")[0] : "";
                String endTime = lessonObject.has("time") ? lessonObject.get("time").getAsString().split(" - ")[1] : "";
                String type = lessonObject.has("type") ? lessonObject.get("type").getAsString() : "";
                String chis_znam = lessonObject.has("chis/znam") ? lessonObject.get("chis/znam").getAsString() : "";
                String subgroup = lessonObject.has("subgroup") ? lessonObject.get("subgroup").getAsString() : "все";

                String normalizedSubgroup = normalizeSubgroup(subgroup);

                // Вставка данных в таблицу lessons
                String query = "INSERT INTO lessons (place, start_time, end_time, id_teacher, id_groups, title, weekday, type, chis_znam, subgroup) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                try (PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
                    preparedStatement.setString(1, place);
                    preparedStatement.setString(2, startTime);
                    preparedStatement.setString(3, endTime);
                    preparedStatement.setInt(4, id_teacher);
                    preparedStatement.setInt(5, id_groups);
                    preparedStatement.setString(6, title);
                    preparedStatement.setInt(7, weekday);
                    preparedStatement.setString(8, type);
                    preparedStatement.setString(9, chis_znam);
                    preparedStatement.setString(10, normalizedSubgroup);
                    preparedStatement.executeUpdate();
                }
            }
        }
    }

    private static String normalizeSubgroup(String subgroup) {
        // Значение подгруппы к общему стандарту
        if (subgroup.equalsIgnoreCase("1 под.")) {
            return "1 под.";
        } else if (subgroup.equalsIgnoreCase("2под.")) {
            return "2 под.";
        } else if (subgroup.equalsIgnoreCase("анг.1")) {
            return "1 анг.";
        } else if (subgroup.equalsIgnoreCase("анг.2")) {
            return "2 анг.";
        } else if (subgroup.equalsIgnoreCase("анг.3")) {
            return "3 анг.";
        } else if (subgroup.equalsIgnoreCase("анг.4")) {
            return "4 анг.";
        } else if (subgroup.equalsIgnoreCase("анг.5")) {
            return "5 анг.";
        } else {
            // Если значение не соответствует известным форматам, возвращаем исходную строку
            return subgroup;
        }
    }

    private static int getWeekday(String dayName) {
        switch (dayName) {
            case "Monday":
                return 1;
            case "Tuesday":
                return 2;
            case "Wednesday":
                return 3;
            case "Thursday":
                return 4;
            case "Friday":
                return 5;
            case "Saturday":
                return 6;
            case "Sunday":
                return 7;
            default:
                return 0;
        }
    }

    private static int getGroupId(Connection connection, String groupName) throws SQLException {
        String query = "SELECT id_groups FROM groups WHERE title = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, groupName);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt("id_groups");
            } else {
                // Если группа не найдена
                throw new SQLException("Группа с именем " + groupName + " не найдена.");
            }
        }
    }

    private static int getTeacherId(Connection connection, String teacherName) throws SQLException {
        String query = "SELECT id_teacher FROM teachers WHERE full_name = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, teacherName);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt("id_teacher");
            } else {
                // Если преподаватель не найден
                throw new SQLException("Преподаватель с именем " + teacherName + " не найден.");
            }
        }
    }
}
