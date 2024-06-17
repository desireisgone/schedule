import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";

export type Group = {
  id_group: number;
  title: string;
  id_faculty: number;
}

export type Faculty = {
  id_faculty: number;
  title: string;
  id_university: number;
}

export type University = {
  id_university: number;
  title: string;
  city: string;
  reduction: string;
}

export type LessonType = {
  id_lesson: number;
  title: string;
  place: string;
  start_time: string;
  end_time: string;
  type: string;
  weekday: number;
  chis_znam: string;
  subgroup: string;
  id_group: number;
  id_teacher: number;
  date_read: string;
  group_title: string;
  full_name: string;
}

export type TeacherType = {
  id_teacher: number;
  full_name: string;
}

export type StackParamList = {
  Profile: {
    group: Group;
    university_title: string;
  }
  Universities: undefined;
  Faculties: {
    id_university: number;
    university_title: string;
  }
  Groups: {
    id_faculty: number;
    university_title: string;
  }
}

export type CacheSchema = {
  user_university: string;
  user_group: string;
  user_id_group: string;
  user_schedule: {
    mainSchedule: LessonType[][],
    lessonsBySubgroups: {
      [key: string]: LessonType[],
    },
  },
}

export type ScreenFacultiesProps = StackScreenProps<StackParamList, 'Faculties'>
export type ScreenUniversitiesProps = StackScreenProps<StackParamList, 'Universities'>
export type ScreenGroupsProps = StackScreenProps<StackParamList, 'Groups'>
export type ScreenProfileProps = StackScreenProps<StackParamList, 'Profile'>