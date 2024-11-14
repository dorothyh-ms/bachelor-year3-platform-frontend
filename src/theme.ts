// src/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50',
        },
        secondary: {
            main: '#2196F3',
        },
    },
    typography: {
        h4: {
            fontWeight: 600,
        },
    },
});

export default theme;
