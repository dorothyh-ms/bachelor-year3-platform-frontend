import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, CssBaseline} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GamesIcon from '@mui/icons-material/Games';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import FriendsIcon from '@mui/icons-material/Group';
import MailIcon from '@mui/icons-material/Mail';
import ProfileEdit from './pages/ProfileEdit';
import Home from './pages/Home';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import Store from './pages/Store';
import Friends from './pages/Friends';
import GameInvitations from './pages/GameInvitations';
import Lobby from './pages/Lobby';
import InvitePlayer from './pages/InvitePlayer';
import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';

const drawerWidth = 240;

const handleLogout = () => {
    // Define the post_logout_redirect_uri (the URL to which the user will be redirected after logout)
    const postLogoutRedirectUri = 'http://localhost:5173'; // Your post logout URL

    const logoutUrl = `http://localhost:8180/realms/banditgames/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;

    // Redirect the user to the Keycloak logout endpoint
    window.location.href = logoutUrl;
};

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline/>
            <Box sx={{display: 'flex'}}>
                {/* Sidebar */}
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
                        <ListItem component={Link} to="/" button>
                            <ListItemIcon>
                                <HomeIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                        <ListItem component={Link} to="/games" button>
                            <ListItemIcon>
                                <GamesIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Games"/>
                        </ListItem>
                        <ListItem component={Link} to="/leaderboard" button>
                            <ListItemIcon>
                                <LeaderboardIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Leaderboard"/>
                        </ListItem>
                        <ListItem component={Link} to="/store" button>
                            <ListItemIcon>
                                <StoreIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Store"/>
                        </ListItem>
                        <ListItem component={Link} to="/friends" button>
                            <ListItemIcon>
                                <FriendsIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Friends"/>
                        </ListItem>
                        <ListItem component={Link} to="/game-invitations" button>
                            <ListItemIcon>
                                <MailIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Game Invitations"/>
                        </ListItem>
                        <ListItem component={Link} to="/profile-edit" button>
                            <ListItemIcon>
                                <MailIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile"/>
                        </ListItem>
                        <ListItem component={Link} to="/lobbies" button>
                            <ListItemIcon>
                                <GamesIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Lobbies"/>
                        </ListItem>
                        <ListItem component={Link} to="/invite" button>
                            <ListItemIcon>
                                <MailIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Invite Player"/>
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon>
                                {/* You can add any icon for logout here, for example, a PowerOffIcon */}
                                <MailIcon sx={{color: '#ffffff'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
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
                    <Toolbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/games" element={<Games/>}/>
                        <Route path="/leaderboard" element={<Leaderboard/>}/>
                        <Route path="/store" element={<Store/>}/>
                        <Route path="/friends" element={<Friends/>}/>
                        <Route path="/game-invitations" element={<GameInvitations/>}/>
                        <Route path="/profile-edit" element={<ProfileEdit/>}/>
                        <Route
                            path="/lobbies"
                            element={
                                <ProtectedRoute>
                                    <Lobby/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/invite"
                            element={
                                <ProtectedRoute>
                                    <InvitePlayer/>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
