import React, { useState } from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import AddGameForm from '../components/AddGameForm/AddGameForm';
import PageLayout from '../layouts/PageLayout';

const AddGamePage = () => {

    return (
        <PageLayout title="Submit a request to publish a game" >
        <AddGameForm  />
    </PageLayout>
    );
};

export default AddGamePage;
