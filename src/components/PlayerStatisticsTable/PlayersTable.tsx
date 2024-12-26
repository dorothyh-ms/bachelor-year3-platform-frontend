import Box from '@mui/material/Box';
import { DataGrid, GridColDef  } from '@mui/x-data-grid';
import { usePlayerStatistics } from '../../hooks/usePlayerStatistics';
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);



function formatSeconds(seconds: number) {
    const time = dayjs.duration(seconds, "seconds");
    const hours = time.hours();
    const minutes = time.minutes();

    if (hours > 0) {
        return `${hours} hours ${minutes} minutes`;
    }
    return `${minutes} minutes`;
}

const columns: GridColDef[] = [

    {
        field: 'playerName',
        headerName: 'Username',
        display: "flex",
        width: 120,

    },
    {
        field: 'birthDate',
        headerName: 'Age',
        display: "flex",
        width: 120,
        valueGetter: (value: string) => {
            const today = dayjs(); // Get today's date
            const dob = dayjs(value); // Parse the date of birth string
            return `${today.diff(dob, 'year')}`; // Calculate the age in years
        },
    },

  {
        field: 'city',
        headerName: 'City',
        display: "flex",
        width: 120,
    },
    {
        field: 'country',
        headerName: 'Country',
        display: "flex",
        width: 120,
    },
    {
        field: 'gameTitle',
        headerName: 'Game',
        display: "flex",
    },
    {
        field: 'totalTimeSpent',
        headerName: 'Time spent',
        type: 'number',
        display: "flex",
        width: 240,
        valueGetter: (value : number) => `${formatSeconds(value)}`,
    },
    {
        field: 'wins',
        headerName: 'Wins',

    },
    {
        field: 'losses',
        headerName: 'Losses',

    },
];


const PlayersTable = () => {
    const { playerStatistics: rows, isLoading } = usePlayerStatistics();

    const rowsWithId = rows?.map((row, index) => ({
        ...row,
        internalId: index,
    }));

    return (
        <Box sx={{ height: 400, width: 'fit-content' }}>
            <DataGrid
                getRowId={(row) => row.internalId}
                sx={{ backgroundColor: "background.default", width: "fit-content" }}
                rows={rowsWithId}
                columns={columns}


                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                autoHeight

                disableRowSelectionOnClick
                loading={isLoading}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                    loadingOverlay: {
                        variant: 'circular-progress',
                        noRowsVariant: 'skeleton',
                    },
                }}

            />
        </Box>
    );
}

export default PlayersTable;