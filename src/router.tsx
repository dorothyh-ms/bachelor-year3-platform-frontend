import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import Home from "./pages/HomePage";
import Games from "./pages/GamesPage";
import Store from "./pages/Store";
import Friends from "./pages/FriendsPage";

import GameInvitations from "./pages/InvitationsPage";
import ProfileEdit from "./pages/ProfileEdit";
import Lobby from "./pages/LobbiesPage";
import MainLayout from "./layouts/MainLayout";

export const HOME = "/";
export const GAMES = "/games"
export const STORE = "/store"
export const FRIENDS = '/friends'
export const INVITES = '/invites'
export const PROFILE = '/profile'
export const LOBBIES = '/lobbies'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route path={HOME} element={<Home/>}/>
            <Route path={GAMES} element={<Games/>}/>
            <Route path={STORE} element={<Store/>}/>
            <Route element={<RequireAuth />}>
                <Route path={FRIENDS} element={<Friends/>}/>
                <Route path={INVITES} element={<GameInvitations/>}/>
                <Route path={PROFILE} element={<ProfileEdit/>}/>
                <Route path={LOBBIES} element={<Lobby/>}/>
            </Route>
        </Route>

    )
);

export default router;