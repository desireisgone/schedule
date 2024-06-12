export interface Theme {
  dark: boolean;
  colors: {
    maincolor: string;
    buttons_and_lessons: string;
    light_for_search_and_daynumber: string;
    chosen_text: string;
    alter: string;
    background: string;
  }
} 

const green: Theme = {
  dark: false,
  colors: {
    maincolor: '#63836b',
    buttons_and_lessons: '#9ec1a7',
    light_for_search_and_daynumber: '#a7c1ae',
    chosen_text: 'white',
    alter: '#b46e4c',
    background: 'white',
  }
}

const blue: Theme = {
  dark: false,
  colors: {
    maincolor: '#3d64ec',
    buttons_and_lessons: '#7393ff',
    light_for_search_and_daynumber: '#98AFFF',
    chosen_text: 'black',
    alter: '#ffcd5b',
    background: 'white',
  }
}

const dark: Theme = {
  dark: true,
  colors: {
    maincolor: '#1c1c1c',
    buttons_and_lessons: '#3d3d3d',
    light_for_search_and_daynumber: '#969696',
    chosen_text: 'white',
    alter: '#e3e3e3',
    background: 'white',
  }
}


export const themes = { green, blue, dark }
export enum ThemeTypes {
  green = 'green',
  blue = 'blue',
  dark = 'dark',
}

export const themeTitles = {
  green: 'Ну название',
  blue: 'Ну название',
  dark: 'Ну название',
}

export function getThemeInfo(title: string) {
  switch (title) {
    case 'green':
      return {
        name: ThemeTypes.green,
        icon: require('../assets/green.png')
      }
    case 'dark':
      return {
        name: ThemeTypes.dark,
        icon: require('../assets/dark.png')
      }
    default:
      return {
        name: ThemeTypes.blue,
        icon: require('../assets/blue.png')
      }
  }
}