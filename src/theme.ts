import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1E1E2F', // Sidebar and header
        },
        secondary: {
            main: '#646cff', // Accent buttons
        },
        text: {
            primary: '#36d2ee',
            secondary: '#a9a9a9',
        },
        background: {
            default: '#2A2A40', // Main background
            paper: '#3C3C55', // Card backgrounds
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2rem',
            color: '#24d9ee',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#3fcade',
        },
    },
});

export default theme;
