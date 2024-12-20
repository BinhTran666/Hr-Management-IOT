import React from 'react'
import { 
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme,
    colors,
    Slide,
} from '@mui/material'

 import { 
    SettingsOutlined,
    ChevronLeftOutlined,
    ChevronLeft,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOffOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    SmartToyOutlined,
} from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FLexBetween from './FlexBetween'
import profileImage from '../assets/user.jpg'

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Employees Facing",
        icon: null,
    },
    {
        text: "Employee",
        icon: <Groups2Outlined />,
    },
    {
        text: "Check in",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Chat_Bot",
        icon: <SmartToyOutlined />,
    },

];


const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant= "persistent"
                    anchor='left'
                    sx ={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                    }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FLexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4' fontWeight="bold">
                                        MANAGEVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>

                                )}
                            </FLexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon}) => {
                                if(!icon)  {
                                    return (
                                        <Typography key = {text} sx={{m: "2rem 0 1rem 3rem"}}>
                                            {text}
                                        </Typography>
                                    )
                                }  
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key = {text} disablePadding>
                                        <ListItemButton 
                                            onClick={() => {navigate(`/${lcText}`);
                                            setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                                color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml : "2rem",
                                                    color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronLeftOutlined sx={{ ml: "auto"}}/>
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                            </List>
                    </Box>

                    <Box position="absolute" bottom="12px">
                        <Divider />
                        <FLexBetween textTransform="none" gap="1rem" m="1rem 2rem 0rem 3rem">
                            <Box
                                component="img"
                                alt='profile'
                                src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{objectFit: "cover"}}
                            />
                            <Box textAlign="left">
                                <Typography fontSize="0.9rem" fontWeight="bold" sx={{color: theme.palette.secondary[100]}}>
                                    {user.name}
                                </Typography>
                            </Box>
                            <SettingsOutlined 
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px",
                                }}
                            />
                        </FLexBetween>
                    </Box>
                </Drawer>    
            )}
        </Box>
    )
}

export default Sidebar