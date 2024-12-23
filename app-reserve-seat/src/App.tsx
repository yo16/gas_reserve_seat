/*
    アプリ全体
*/
import { ThemeProvider } from '@mui/material';
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography';


import theme from './theme';
import { ReserveMain } from './ReserveMain'
import './App.css'

function App() {

    return (
        <ThemeProvider theme={theme}>
            <AppBar
                position="fixed"
                sx={{
                    height: "50px"
                }}
            >
                <Typography
                    variant="h1"
                >
                    うぶすな ふるさと館まつり（2025年春）　観覧席の予約
                </Typography>
            </AppBar>
            <main
                className="app-main"
            >
                <ReserveMain />
            </main>
        </ThemeProvider>
    )
}

export default App
