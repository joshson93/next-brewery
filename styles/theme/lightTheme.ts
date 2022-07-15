import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      dark: '#002D54',
      main: '#00548E',
    },
  },
});

export default lightTheme;
