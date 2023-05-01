import { useEffect, useState } from "react";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { getTestingData } from "../api/testing.api";
import { TestingBase} from "../models/testing.model"
import TestingTable from "../components/TestingTable";
import { Box } from "@mui/system";
import TestingMap from "../components/TestingMap";
import dayjs from 'dayjs';

export default function Testing(props:any) {
    const [data, setData] = useState<TestingBase>();
    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState<string>(today);

    useEffect(() => {
        const newDate = dayjs(props.date).get('year') + '-' + dayjs(props.date).get('month') + '-' + dayjs(props.date).get('date');
        console.log(newDate);
        setDate(newDate);
        getData()
    }, [props, data]);

    const getData = async () => {
        const data = await getTestingData(date);
        console.log(data);
        setData(data);
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={5} height={'88vh'}>
                <TestingTable data={data?.testingData} />
            </Grid>
            <Grid item xs={12} md={7}>
                <Grid container spacing={5}>
                    <Grid item xs={6} md={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#EFF5F5'
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'}>
                                    New Cases
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'} paddingTop={'10px'}>
                                    {data?.testingMetrics.new_positives}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#EFF5F5'
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'}>
                                    Total Cases
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'} paddingTop={'10px'}>
                                    {data?.testingMetrics.total_positives}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#EFF5F5'
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'}>
                                    New Tests
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'} paddingTop={'10px'}>
                                    {data?.testingMetrics.new_tests}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#EFF5F5'
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'}>
                                    Total Tests
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="div" display={'flex'} justifyContent={'center'} paddingTop={'10px'}>
                                    {data?.testingMetrics.total_tests}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ border: '1px solid #e0e0e0' }} height={'60vh'}>
                            <TestingMap data={data?.testingData}/>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}