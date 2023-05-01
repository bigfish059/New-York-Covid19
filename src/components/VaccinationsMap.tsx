import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { countyData } from '../county';
import colormap from 'colormap';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';

const colors = colormap({
    colormap: 'summer',
    nshades: 100,
    format: 'hex',
    alpha: 1
})

export default function VaccinationsMap(props: any) {
    const [data, setData] = useState<any>([]);
    const [type, setType] = useState<string>('First Dose');

    useEffect(() => {
        if (props.data) {
            setData(props.data);
        }

    }, [props]);

    return (
        <>
            <Grid container sx={{ backgroundColor: '#EFF5F5' }}>
                <Grid item md={2}>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value as string)}
                    >
                        <MenuItem value={'First Dose'}>First Dose</MenuItem>
                        <MenuItem value={'Series Complete'}>Series Complete</MenuItem>
                    </Select>
                </Grid>
                <Grid item md={10} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant="h6" component="div">
                        {type}
                    </Typography>
                </Grid>
            </Grid>
            <MapContainer center={[42.7128, -76.0060]} zoom={7} scrollWheelZoom={false} style={{ height: '95%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
                {
                    countyData.features.map((county: any) => {
                        const coordinates = county.geometry.coordinates[0].map((coord: any) => [coord[1], coord[0]]);
                        const countyName = county.properties.name;
                        const countyPopulation = county.properties.POP;
                        const countyData = data.find((county: any) => county.county === countyName);

                        // add color based on number of cases
                        const count = countyData ? 
                        type ===  'First Dose' ? (countyData.first_dose / countyPopulation) * 100 : (countyData.series_complete / countyPopulation) * 100 : 0;
                        const color = colors[Math.floor(count)];

                        return (
                            <Polygon
                                key={countyName}
                                positions={coordinates}
                                pathOptions={{ color: '#FFFFFF', fillColor: color, fillOpacity: 0.8, stroke: true, weight: 1}}
                            />
                        )
                    })
                }
            </MapContainer>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '40px',
                background: `linear-gradient(to right, ${colors.join(',')})`, paddingX: '10px'
            }}>
                <Typography variant="body2" component="div" color={'#FFFFFF'}>
                    Min
                </Typography>
                <Typography variant="body2" component="div">
                    Max
                </Typography>
            </Box>
        </>
    )
}
