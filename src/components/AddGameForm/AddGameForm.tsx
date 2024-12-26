import { Button, IconButton, Snackbar, SnackbarCloseReason, Stack, TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddGameToPlatformRequest } from "../../hooks/useAddGameToPlatformRequest";
import GamePublishRequest from "../../types/GamePublishRequest";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const validationSchema = Yup.object({
    gameTitle: Yup.string().required("Game title is required"),
    genre: Yup.string().required("Genre is required"),
    price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
    description: Yup.string().required("Description is required"),
});

const GameForm = () => {
    const handleClose = (
        _: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };
    const action = (
        <>

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );


    const [ snackbarOpen, setSnackBarOpen ] = useState<boolean>(false);
    const [snackbarMessage, setSnackBarMessage] = useState<string>();
   
    const handleSuccess = () => {
        setSnackBarMessage("Your request to publish your game was submitted.");
        setSnackBarOpen(true);
    }
    const {submitAddGameToPlatformRequest} = useAddGameToPlatformRequest(handleSuccess);
    const onSubmit = (values: GamePublishRequest, actions:any) => {
        submitAddGameToPlatformRequest(values);
        actions.resetForm();
    };





    const formik = useFormik({
        initialValues: {
            gameTitle: "",
            genre: "",
            price: "",
            description: "",
        },
        validationSchema,
        onSubmit,
    });

    return (
        <Stack sx={{ width: { xs: "75%", md: "50%", lg: "25%" } }}>
            
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            color={"secondary"}
                            label="Game Title"
                            name="gameTitle"
                            value={formik.values.gameTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.gameTitle && Boolean(formik.errors.gameTitle)}
                            helperText={formik.touched.gameTitle && formik.errors.gameTitle}
                            fullWidth
                        />

                        <TextField
                            color={"secondary"}
                            label="Genre"
                            name="genre"
                            value={formik.values.genre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.genre && Boolean(formik.errors.genre)}
                            helperText={formik.touched.genre && formik.errors.genre}
                            fullWidth
                        />

                        <TextField
                            color={"secondary"}
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
                            color={"secondary"}
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

                        <Button type="submit" variant="contained" color="secondary">
                            Submit
                        </Button>
                    </Stack>
                </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={action}
            />
           
        </Stack>
    );
};

export default GameForm;
