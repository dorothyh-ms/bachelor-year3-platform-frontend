import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
} from '@mui/material';

const ProfileEdit: React.FC = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        age: 25,
        location: 'New York',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log('Profile saved:', profile);
        alert('Profile updated successfully!');
        // You can send `profile` data to your backend here.
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: '500px',
                margin: '2rem auto',
                backgroundColor: '#fff',
                borderRadius: '8px',
            }}
        >
            <Typography variant="h4" textAlign="center" gutterBottom>
                Edit Profile
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Age"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                />
                <TextField
                    label="Location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
            </Stack>
        </Paper>
    );
};

export default ProfileEdit;
