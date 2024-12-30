import { Stack, Typography } from "@mui/material";

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => {
    const { title, children } = props;
    return (
        <Stack sx={{ mt: 6, width: { xs: "100%", lg: "80%" } }}>
            <Typography
                sx={{ mb: 6 }}
                variant={"h5"}>{title}</Typography>
            <Stack sx={{gap: 6}}>
                {children}
            </Stack>

        </Stack>
    )
}
export default PageLayout;