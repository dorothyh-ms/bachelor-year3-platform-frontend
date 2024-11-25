import React, { useContext } from 'react';
import { SecurityContext } from '../context/SecurityContext';
import { Button } from '@mui/material';

const Header: React.FC = () => {
    const { isAuthenticated, login, logout } = useContext(SecurityContext);

    return (
        <header style={{ padding: '1rem', textAlign: 'right' }}>
            {isAuthenticated ? (
                <Button variant="contained" color="secondary" onClick={logout}>
                    Logout
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={login}>
                    Login
                </Button>
            )}
        </header>
    );
};

export default Header;
