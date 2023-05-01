import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Testing from '../pages/Testing';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Vaccinations from '../pages/Vaccinations';
import Fatalities from '../pages/Fatalities';

const drawerWidth = 340;

export default function ClippedDrawer() {

    const today = new Date().toISOString().slice(0, 10);

    const [date, setDate] = useState<Dayjs | null>(dayjs(today));
    const [section, setSection] = useState('Testing');

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                boxShadow: 'none',
                borderBottom: '1px solid #E0E0E0',
                backgroundColor: '#0A2647',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{
                        fontFamily: 'Jaldi',
                        fontWeight: 400,
                        fontSize: '24px',
                        color: '#FFFFFF'
                    }}>
                        NY COVID-19
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Testing', 'Vaccination', 'Fatalities'].map((text, index) => (
                            <ListItem key={text} disablePadding
                                sx={{
                                    backgroundColor: section === text ? '#E0E0E0' : '#FFFFFF',
                                }}>
                                <ListItemButton
                                    onClick={() => {
                                        setSection(text)
                                    }}>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)}/>
                    </LocalizationProvider>
                    <Divider/>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                {section === 'Testing' && <Testing date={date}/>}
                {section === 'Vaccination' && <Vaccinations date={date}/>}
                {section === 'Fatalities' && <Fatalities date={date}/>}
            </Box>
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: '#0A2647',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
                borderTop: '1px solid #E0E0E0',
            }}>
                <Typography variant="body2" noWrap component="div" sx={{
                    fontFamily: 'Jaldi',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#FFFFFF',
                }}>
                    Data provided by the New York State Department of Health
                </Typography>
            </Box>
        </Box>
    );
}
