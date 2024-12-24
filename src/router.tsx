import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import Home from "./pages/HomePage";
import Games from "./pages/LibraryPage";
import Store from "./pages/Store";
import Friends from "./pages/FriendsPage";
import FavoritesPage from "./pages/FavoritesPage";

import InvitationsPage from "./pages/InvitationsPage";
import ProfilePage from "./pages/ProfilePage";
import Lobby from "./pages/LobbiesPage";
import MainLayout from "./layouts/MainLayout";
import { ANALYTICS, FRIENDS, GAMES, HOME, INVITES, LOBBIES, PROFILE, STORE, SUBMIT_GAME_APPLICATION } from "./constants/routes";
import RequireCompletedProfile from "./components/RequireCompletedProfile/RequireCompletedProfile";
import AnalyticsPage from "./pages/AnalyticsPage";
import AddGameForm from "./components/AddGameForm/AddGameForm";
import AddGamePage from "./pages/AddGamePage";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route path={HOME} element={<Home />} />
            <Route path={STORE} element={<Store />} />
            <Route element={<RequireAuth />}>
                <Route element={<RequireCompletedProfile />} >
                    <Route path={GAMES} element={<Games />} />
                    <Route path={FRIENDS} element={<Friends />} />
                    <Route path={INVITES} element={<InvitationsPage />} />
                    <Route path={PROFILE} element={<ProfilePage />} />
                    <Route path={LOBBIES} element={<Lobby />} />
                    <Route path={ANALYTICS} element={<AnalyticsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Route>
                <Route path={SUBMIT_GAME_APPLICATION} element={<AddGamePage />} />
            </Route>
        </Route >


    )
);

export default router;