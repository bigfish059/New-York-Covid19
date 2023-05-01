import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { VaccinationsData } from "../models/vaccinations.model"
import { Box } from "@mui/system";

const columns: GridColDef[] = [
    { field: 'region', headerName: 'Region', type: 'string', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'county', headerName: 'County', type: 'string', width: 180, headerClassName: 'super-app-theme--header' },
    { field: 'first_dose', headerName: 'First Dose', type: 'number', width: 120, headerClassName: 'super-app-theme--header' },
    { field: 'series_complete', headerName: 'Series Complete', type: 'number', width: 120, headerClassName: 'super-app-theme--header' },
]

export default function VaccinationsTable(props: any) {
    const [rows, setRows] = useState<VaccinationsData[]>([]);
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
