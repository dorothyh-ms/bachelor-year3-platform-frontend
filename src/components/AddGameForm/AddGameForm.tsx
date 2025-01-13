import {Button, MenuItem, Snackbar, Stack, TextField} from "@mui/material";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useState} from "react";
import {useAddGameToPlatformRequest} from "../../hooks/useAddGameToPlatformRequest";
import GamePublishRequest from "../../types/GamePublishRequest";

const validationSchema = Yup.object({
    name: Yup.string().required("Game name is required"),
    genre: Yup.string().required("Genre is required"),
    difficultyLevel: Yup.string().required("Difficulty level is required"),
    price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
    description: Yup.string().required("Description is required"),
    url: Yup.string().url("Must be a valid URL").required("URL is required"),
});

const AddGameForm = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleClose = () => setSnackbarOpen(false);

    const {submitAddGameToPlatformRequest} = useAddGameToPlatformRequest(() => {
        setSnackbarMessage("Game submitted successfully!");
        setSnackbarOpen(true);
    });

    const formik = useFormik<GamePublishRequest>({
        initialValues: {
            name: "",
            genre: "",
            difficultyLevel: "",
            price: 0,
            description: "",
            image: null,
            url: "",
        },
        validationSchema,
        onSubmit: (values) => {
            if (!values.image) {
                setSnackbarMessage("An image is required.");
                setSnackbarOpen(true);
                return;
            }

            if (!["image/jpeg", "image/png"].includes(values.image.type)) {
                setSnackbarMessage("Unsupported file format. Only JPEG and PNG are allowed.");
                setSnackbarOpen(true);
                return;
            }

            if (values.image.size > 5 * 1024 * 1024) {
                setSnackbarMessage("File size exceeds the maximum limit of 5MB.");
                setSnackbarOpen(true);
                return;
            }

            submitAddGameToPlatformRequest(values);
            formik.resetForm();
        },
    });

    return (
        <Stack spacing={2} sx={{width: "50%"}}>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Game Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        fullWidth
                    />
                    <TextField
                        label="Genre"
                        name="genre"
                        select
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.genre && Boolean(formik.errors.genre)}
                        helperText={formik.touched.genre && formik.errors.genre}
                        fullWidth
                    >
                        <MenuItem value="ACTION">Action</MenuItem>
                        <MenuItem value="ADVENTURE">Adventure</MenuItem>
                        <MenuItem value="PUZZLE">Puzzle</MenuItem>
                    </TextField>
                    <TextField
                        label="Difficulty Level"
                        name="difficultyLevel"
                        select
                        value={formik.values.difficultyLevel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.difficultyLevel && Boolean(formik.errors.difficultyLevel)}
                        helperText={formik.touched.difficultyLevel && formik.errors.difficultyLevel}
                        fullWidth
                    >
                        <MenuItem value="EASY">Easy</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HARD">Hard</MenuItem>
                    </TextField>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        fullWidth
                    />
                    <TextField
                        type="file"
                        name="image"
                        inputProps={{accept: "image/jpeg, image/png"}}
                        onChange={(event) =>
                            formik.setFieldValue("image", event.currentTarget.files?.[0])
                        }
                        fullWidth
                    />
                    <TextField
                        label="Game URL"
                        name="url"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.url && Boolean(formik.errors.url)}
                        helperText={formik.touched.url && formik.errors.url}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Stack>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
            />
        </Stack>
    );
};

export default AddGameForm;
