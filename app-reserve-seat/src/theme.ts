/*
    全体テーマ
*/
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
    typography: {
        h1: {
            fontSize: '1.5rem',
        },
    },
});

export default theme;
