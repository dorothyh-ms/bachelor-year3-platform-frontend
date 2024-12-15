import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import Home from "./pages/HomePage";
import Games from "./pages/GamesPage";
import Store from "./pages/Store";
import Friends from "./pages/FriendsPage";

import GameInvitations from "./pages/InvitationsPage";
import ProfilePage from "./pages/ProfilePage";
import Lobby from "./pages/LobbiesPage";
import MainLayout from "./layouts/MainLayout";
import { ANALYTICS, FRIENDS, GAMES, HOME, INVITES, LOBBIES, PROFILE, STORE } from "./constants/routes";
import RequireCompletedProfile from "./components/RequireCompletedProfile/RequireCompletedProfile";
import PlayersPage from "./pages/AnalyticsPage";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route path={HOME} element={<Home />} />
            <Route path={STORE} element={<Store />} />
            <Route element={<RequireAuth />}>
                <Route element={<RequireCompletedProfile />} >
                    <Route path={GAMES} element={<Games />} />
                    <Route path={FRIENDS} element={<Friends />} />
                    <Route path={INVITES} element={<GameInvitations />} />
                    <Route path={PROFILE} element={<ProfilePage />} />
                    <Route path={LOBBIES} element={<Lobby />} />
                    <Route path={ANALYTICS} element={<PlayersPage />} />
                </Route>
            </Route>
        </Route >


    )
);

export default router;