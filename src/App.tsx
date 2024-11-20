import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    CssBaseline,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GamesIcon from '@mui/icons-material/Games';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import FriendsIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People'; // Lobby Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile Edit Icon
import Home from './pages/Home';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import Store from './pages/Store';
import Friends from './pages/Friends';
import Lobby from './pages/Lobby'; // Lobby Component
import ProfileEdit from './pages/ProfileEdit'; // Import the Edit Profile page

const drawerWidth = 240;

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
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
                    <Toolbar />
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/games">
                            <ListItemIcon>
                                <GamesIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Games" />
                        </ListItem>
                        <ListItem button component={Link} to="/leaderboard">
                            <ListItemIcon>
                                <LeaderboardIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Leaderboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/store">
                            <ListItemIcon>
                                <StoreIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Store" />
                        </ListItem>
                        <ListItem button component={Link} to="/friends">
                            <ListItemIcon>
                                <FriendsIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItem>
                        <ListItem button component={Link} to="/lobby">
                            <ListItemIcon>
                                <PeopleIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Lobby" />
                        </ListItem>
                        <ListItem button component={Link} to="/profile-edit">
                            <ListItemIcon>
                                <AccountCircleIcon sx={{ color: '#ffffff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" />
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: '#2A2A40',
                        minHeight: '100vh',
                    }}
                >
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/lobby" element={<Lobby />} />
                        <Route path="/profile-edit" element={<ProfileEdit />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
