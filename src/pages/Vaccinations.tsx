import { useState, useEffect } from "react";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { getVaccinationsData } from "../api/vaccinations.api";
import { VaccinationsBase } from "../models/vaccinations.model"
import VaccinationsTable from "../components/VaccinationsTable";
import { Box } from "@mui/system";
import VaccinationsMap from "../components/VaccinationsMap";
import dayjs from 'dayjs';


export default function Vaccinations(props: any) {
    const [data, setData] = useState<VaccinationsBase>();
    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState<string>(today);

    useEffect(() => {
        const newDate = dayjs(props.date).get('year') + '-' + dayjs(props.date).get('month') + '-' + dayjs(props.date).get('date');
        console.log(newDate);
        setDate(newDate);
        getData()
    }, [props, data]);

    const getData = async () => {
        const data = await getVaccinationsData(date);
        console.log(data);
        setData(data);
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={5} height={'88vh'}>
                <VaccinationsTable data={data?.vaccinationsData} />
            </Grid>
            <Grid item xs={12} md={7}>
                <Grid container spacing={5} display={'flex'}>
                    <Grid item xs={6} md={6}>
                        <Card sx={{
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#EFF5F5'
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'}>
                                    First Dose
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'} paddingTop={'10px'}>
                                    {data?.vaccinationsMetrics.first_dose}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Card sx={{
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#EFF5F5'
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'}>
                                    Series Complete
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'} paddingTop={'10px'}>
                                    {data?.vaccinationsMetrics.series_complete}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ border: '1px solid #e0e0e0' }} height={'60vh'}>
                            <VaccinationsMap data={data?.vaccinationsData} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

