import { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import { getFatalitiesData, getFatalitiesBySex, getFatalitiesByAge } from '../api/fatalities.api';
import FatalitiesTable from '../components/FatalitiesTable';
import FatalitiesMap from '../components/FatalitiesMap';
import FatalitiesChart from '../components/FatalitiesChart';
import dayjs from 'dayjs';

export default function Fatalities(props: any) {
    const [data, setData] = useState<any>([]);
    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState<string>(today);
    const [sexData, setSexData] = useState<any>();
    const [ageData, setAgeData] = useState<any>([]);

    useEffect(() => {
        const newDate = dayjs(props.date).get('year') + '-' + dayjs(props.date).get('month') + '-' + dayjs(props.date).get('date');
        console.log(newDate);
        setDate(newDate);
        getData();
    }, [props, ageData]);
    


    const getData = async () => {
        const data = await getFatalitiesData(date);
        console.log(data);
        setData(data);

        const data1 = await getFatalitiesBySex(date);
        console.log(data1);
        setSexData(data1);

        const data2 = await getFatalitiesByAge(date);
        console.log(data2);
        setAgeData(data2);
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={2} height={'88vh'}>
                <FatalitiesTable data={data} />
            </Grid>
            <Grid item xs={12} md={4} height={'85vh'}>
                <FatalitiesChart sex={sexData} age={ageData} />
            </Grid>
            <Grid item xs={12} md={6} height={'85vh'}>
                <FatalitiesMap data={data} />
            </Grid>
        </Grid>
    )
}
