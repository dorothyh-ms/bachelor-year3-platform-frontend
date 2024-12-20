import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import AddGameForm from '../pages/AddGameForm';

const AdminPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Admin Dashboard
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <AddGameForm />
        </Container>
    );
};

export default AdminPage;
