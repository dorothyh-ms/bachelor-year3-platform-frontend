import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {RequireAuth} from "./components/RequireAuth/RequireAuth";
import Home from "./pages/HomePage";
import Games from "./pages/LibraryPage";
import Store from "./pages/Store";
import Friends from "./pages/FriendsPage";
import FavoritesPage from "./pages/FavoritesPage";
import InvitationsPage from "./pages/InvitationsPage";
import Lobby from "./pages/LobbiesPage";
import MainLayout from "./layouts/MainLayout";
import {
    ADD_GAME,
    ADMIN_GAME_LIST,
    ANALYTICS,
    ENGAGEMENT_PREDICTIONS,
    FRIENDS,
    GAMES,
    HOME,
    INVITES,
    LOBBIES,
    MY_SUBMISSIONS,
    STORE,
    SUBMIT_GAME_APPLICATION,
} from "./constants/routes";
import RequireCompletedProfile from "./components/RequireCompletedProfile/RequireCompletedProfile";
import AnalyticsPage from "./pages/AnalyticsPage";
import AddGamePage from "./pages/AddGamePage";
import PlayerEngagementPredictionPage from "./pages/PlayerGameEngagementPage";
import AdminGameListPage from "./pages/AdminGameListPage";
import MySubmissionsPage from "./pages/MySubmissionsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout/>}>
            <Route path={HOME} element={<Home/>}/>
            <Route path={STORE} element={<Store/>}/>
            <Route element={<RequireAuth/>}>
                <Route element={<RequireCompletedProfile/>}>
                    <Route path={GAMES} element={<Games/>}/>
                    <Route path={FRIENDS} element={<Friends/>}/>
                    <Route path={INVITES} element={<InvitationsPage/>}/>
                    <Route path={LOBBIES} element={<Lobby/>}/>
                    <Route path={ANALYTICS} element={<AnalyticsPage/>}/>
                    <Route path={ENGAGEMENT_PREDICTIONS} element={<PlayerEngagementPredictionPage/>}/>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                    <Route path={ADD_GAME} element={<AddGamePage/>}/>
                    <Route path={ADMIN_GAME_LIST} element={<AdminGameListPage/>}/>
                    <Route path={MY_SUBMISSIONS} element={<MySubmissionsPage/>}/>
                </Route>
                <Route path={SUBMIT_GAME_APPLICATION} element={<AddGamePage/>}/>
            </Route>
        </Route>
    )
);

export default router;
