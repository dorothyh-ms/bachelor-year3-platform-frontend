import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

import './App.css';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import SecurityContextProvider from './context/SecurityContextProvider';
import theme from './theme/theme';
import router from './router';
import { CssBaseline, ThemeProvider } from '@mui/material';
const queryClient = new QueryClient();






const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <ThemeProvider theme={theme}>
                   <CssBaseline />
                   <RouterProvider router={router} />
                </ThemeProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
 
    );
};

export default App;
