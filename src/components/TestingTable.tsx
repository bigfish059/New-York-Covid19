import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { TestingData } from '../models/testing.model';

const columns: GridColDef[] = [
    { field: 'county', headerName: 'County', type: 'string', width: 120, headerClassName: 'super-app-theme--header' },
    { field: 'new_positives', headerName: 'New Cases', type: 'number', headerClassName: 'super-app-theme--header' },
    { field: 'cumulative_number_of_positives', headerName: 'Total Cases', type: 'number', headerClassName: 'super-app-theme--header' },
    { field: 'total_number_of_tests', headerName: 'New Tests', type: 'number', headerClassName: 'super-app-theme--header' },
    { field: 'cumulative_number_of_tests', headerName: 'Total Tests', type: 'number', headerClassName: 'super-app-theme--header' },
    { field: 'test_positive', headerName: 'Test Positive Rate', type: 'number', headerClassName: 'super-app-theme--header' },
];

export default function DataTable(props: any) {

    const [rows, setRows] = useState<TestingData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (props.data) {
            setRows(props.data);
            setLoading(false);
        }
    }, [props.data]);


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
                rows={rows}
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
        </Box >
    );
}