import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    MenuItem,
    CircularProgress,
} from '@mui/material';

interface GameFormValues {
    title: string;
    genre: string;
    description: string;
    releaseDate: string;
    price: number;
}

const gameGenres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Puzzle', 'Simulation'];

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    genre: Yup.string().required('Genre is required'),
    description: Yup.string().min(10, 'Description must be at least 10 characters').required(),
    releaseDate: Yup.string().required('Release date is required'),
    price: Yup.number()
        .min(0, 'Price must be a positive number')
        .required('Price is required'),
});

const AddGameForm: React.FC = () => {
    const initialValues: GameFormValues = {
        title: '',
        genre: '',
        description: '',
        releaseDate: '',
        price: 0,
    };

    const handleSubmit = (values: GameFormValues, { resetForm }: { resetForm: () => void }) => {
        console.log('Game Submitted:', values);
        alert('Game Added Successfully!');
        resetForm();
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Add Game to Platform
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, handleChange }) => (
                    <Form>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                fullWidth
                                name="title"
                                label="Game Title"
                                variant="outlined"
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />
                        </Box>

                        <Box mb={2}>
                            <Field
                                as={TextField}
                                select
                                fullWidth
                                name="genre"
                                label="Genre"
                                variant="outlined"
                                error={touched.genre && Boolean(errors.genre)}
                                helperText={touched.genre && errors.genre}
                            >
                                {gameGenres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                        {genre}
                                    </MenuItem>
                                ))}
                            </Field>
                        </Box>

                        <Box mb={2}>
                            <Field
                                as={TextField}
                                fullWidth
                                multiline
                                rows={4}
                                name="description"
                                label="Description"
                                variant="outlined"
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </Box>

                        <Box mb={2}>
                            <Field
                                as={TextField}
                                fullWidth
                                type="date"
                                name="releaseDate"
                                label="Release Date"
                                InputLabelProps={{ shrink: true }}
                                error={touched.releaseDate && Boolean(errors.releaseDate)}
                                helperText={touched.releaseDate && errors.releaseDate}
                            />
                        </Box>

                        <Box mb={3}>
                            <Field
                                as={TextField}
                                fullWidth
                                type="number"
                                name="price"
                                label="Price ($)"
                                variant="outlined"
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />
                        </Box>

                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{ mr: 2 }}
                            >
                                {isSubmitting ? <CircularProgress size={24} /> : 'Add Game'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddGameForm;
