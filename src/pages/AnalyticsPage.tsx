import { Box, Button, Paper, Typography } from "@mui/material";
import PageLayout from "../layouts/PageLayout"
import PlayersTable from "../components/PlayerStatisticsTable/PlayersTable";


import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useExportPlayerStatisticsCsv from "../hooks/useExportPlayerStatisticsCsv";
const AnalyticsPage = () => {

    const {handleStatisticsCsvDownload} = useExportPlayerStatisticsCsv();

    return <PageLayout title="Analytics" >
        <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
            <Typography variant='h6' >Player statistics</Typography>
            <Button 
            startIcon={<FileDownloadIcon />}
            onClick={handleStatisticsCsvDownload} 
            variant="contained"
            color='secondary'
            >Export</Button>
        </Box>
        <PlayersTable />
    </PageLayout>

}

export default AnalyticsPage;