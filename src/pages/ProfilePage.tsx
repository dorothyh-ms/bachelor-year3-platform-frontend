import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
} from '@mui/material';
import { useFetchProfile } from '../hooks/useProfile';

import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface ProfileValues {
        
}

const ProfilePage = () => {
    
    const { profile } = useFetchProfile();
    const [profileValues, setProfileValues] = useState<ProfileValues>(
        {...profile, 

        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileValues((prevProfile) => ({
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
                borderRadius: '8px',
            }}
        >
            <Typography variant="h4" textAlign="center" gutterBottom>
                Edit Profile
            </Typography>
            <Stack spacing={2}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        label="Controlled field"
                        value={profile.birthDate}
                        onChange={handleChange}
                    />
                </LocalizationProvider>
                <TextField
                    label="Age"
                    name="age"
                    value={profileValues.age}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                />
                <TextField
                    label="Location"
                    name="location"
                    value={profileValues.location}
                    onChange={handleChange}
                    fullWidth
                /> */}
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

export default ProfilePage;
