import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    palette: {
      primary: string;
      secondary: string;
    };
  }
}

export const theme: DefaultTheme = {
  palette: {
    primary: '#6a45ff',
    secondary: '#f8fafe',
  },
};
