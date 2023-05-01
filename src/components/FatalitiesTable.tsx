import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { FatalitiesData } from '../models/fatalities.model';

const columns: GridColDef[] = [
    { field: 'county', headerName: 'County', type: 'string', width: 130, headerClassName: 'super-app-theme--header' },
    { field: 'fatality', headerName: 'Fatalities', type: 'number', headerClassName: 'super-app-theme--header' },
]

export default function FatalitiesTable(props: any) {
    const [data, setData] = useState<FatalitiesData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setData(props.data);
        setLoading(false);
    }, [props]);

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                '& .super-app-theme--header': {
                    backgroundColor: '#EFF5F5',
                },
            }}
        >
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                getRowId={(row) => row.county}
                rowHeight={44}
                loading={loading}
                sx={{ backgroundColor: '#FFFBF5' }}
                components={{
                    LoadingOverlay: () => {
                        return (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <CircularProgress color="primary" />
                            </div>
                        )
                    }
                }}
            />
        </Box>
    )
}

