import { useState, useEffect } from 'react';
import { Card, Divider, Grid, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const renderActiveShape = (props: { cx: any; cy: any; midAngle: any; innerRadius: any; outerRadius: any; startAngle: any; endAngle: any; fill: any; payload: any; percent: any; value: any; }) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function FatalitiesChart(this: any, props: any) {
    const [data, setData] = useState<any>([
        { name: 'Male', value: 1 },
        { name: 'Female', value: 1 }
    ]);

    const [activeIndex, setActiveIndex] = useState<any>(0);
    const onPieEnter = (data: any, index: any) => {
        setActiveIndex(index);
    };

    const [ageData, setAgeData] = useState<any>([]);

    useEffect(() => {
        if (props.sex) {
            setData([
                { name: 'Male', value: props.sex.male },
                { name: 'Female', value: props.sex.female }
            ])
        }

        if (props.age) {
            setAgeData(props.age);
        }
    }, [props]);

    return (
        <Grid container spacing={5} height={'100%'} width={'100%'}>
            <Grid item xs={12} md={12} height={'400px'}>
                <Card sx={{ width: '100%', height: '100%', boxShadow: 'none', border: '1px solid #e0e0e0', backgroundColor: '#FFFBF5'}}>
                    <Typography variant="body1" component="h2" sx={{ p: 2, backgroundColor: '#EFF5F5' }}>
                        Fatalities by Gender
                    </Typography>
                    <Divider />
                    <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} height={'450px'}>
                <Card sx={{ width: '100%', height: '100%', boxShadow: 'none', border: '1px solid #e0e0e0', backgroundColor: '#FFFBF5' }}>
                    <Typography variant="body1" component="h2" sx={{ p: 2, backgroundColor: '#EFF5F5' }}>
                        Fatalities by Age
                    </Typography>
                    <Divider />
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart
                            data={ageData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age_group" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="fatality_count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Grid>
        </Grid>
    )
}




