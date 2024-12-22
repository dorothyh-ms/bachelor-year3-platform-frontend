
import { Avatar, Box, Button, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import {  Outlet } from "react-router-dom"

import { ReactNode, useContext } from "react"

import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import GroupIcon from '@mui/icons-material/Group';
import MailIcon from '@mui/icons-material/Mail';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ANALYTICS, FRIENDS, GAMES, HOME, INVITES, LOBBIES, PROFILE, SUBMIT_GAME_APPLICATION } from "../constants/routes"
import SecurityContext from "../context/SecurityContext";
import { useNavigate } from "react-router-dom";

import NavigationTab from "../components/NavLink/NavLink";


export interface NavigationLink {
    route: string;
    text: string;
    icon: ReactNode;
    handleClick : () => void;
}

const MainLayout = () => {
    const drawerWidth = 240;
    const {loggedInUser, login} = useContext(SecurityContext);

    const navigate = useNavigate();

    const drawerLinks: NavigationLink[] = [
        {
            route: HOME, 
            text: "Home", 
            icon: <HomeIcon color="secondary"/>, 
            handleClick : () => {navigate(HOME)}
        }, 
        // {
        //     route: STORE, 
        //     text: "Store", 
        //     icon: <StorefrontIcon color="secondary"/>,
        //     handleClick : () => {navigate(STORE)}
        // },
        
    ]

    const loggedInPlayerLinks: NavigationLink[] = [
        {
            route: GAMES, 
            text: "Library", 
            icon: <CasinoIcon color="secondary"/>,
            handleClick : () => {navigate(GAMES)}
        },
        {
            route: FRIENDS, 
            text: "Friends", 
            icon: <GroupIcon color="secondary"/>,
            handleClick : () => {navigate(FRIENDS)}
        }, 
        {
            route: INVITES, 
            text: "Invites", 
            icon: <MailIcon color="secondary"/>,
            handleClick : () => {navigate(INVITES)}
        }, 
        {
            route: LOBBIES, 
            text: "Lobbies", 
            icon: <MeetingRoomIcon color="secondary"/>,
            handleClick : () => {navigate(LOBBIES)}
        },
        {
            route: SUBMIT_GAME_APPLICATION, 
            text: "Submit a game", 
            icon: <AddBoxIcon color="secondary"/>,
            handleClick : () => {navigate(SUBMIT_GAME_APPLICATION)}
        },
        
    ]
if (loggedInUser){
    loggedInPlayerLinks.push({
        route: ANALYTICS, 
        text: "Analytics", 
        icon: <AnalyticsIcon color="secondary"/>,
        handleClick : () => {navigate(ANALYTICS)}
    })
}


    const renderNavLinks = () => {
        return <>
         {
            drawerLinks.map((link) => (<NavigationTab link={link} />))
        }
        {
            loggedInUser && loggedInPlayerLinks.map((link) => (<NavigationTab link={link} />))
        }
        </>
    }


    
    return <Box sx={{display: 'flex'}}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#1E1E2F',
                            color: '#ffffff',
                        },
                      
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar/>
                    <List>
                   {renderNavLinks()}
                    </List>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 32,
                        marginLeft: 4,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2
                    }}
                    onClick={() => {
                        navigate(PROFILE)
                    }}
                >
                    <Avatar
                        sx={{ cursor: "pointer", 
                            width:36, 
                            height:36, 
                            backgroundColor: "secondary" }}  
                    />
                    <Box
                        sx={{
                            marginTop: 1,                         
                            fontSize: 12,
                        }}
                    >
                        {loggedInUser ? loggedInUser.username : <Button 
                        color="secondary" 
                        onClick={() => {login()}}
                        variant='contained'
                        >Log in
                        </Button>}
                    </Box>
                </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: '#2A2A40',
                        minHeight: '100vh',
                        display: "flex", 
                        justifyContent: "center"
                    }}
                >
                   <Outlet />
                </Box>
            </Box>
}

export default MainLayout;