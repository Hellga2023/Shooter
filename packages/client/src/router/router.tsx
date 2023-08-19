import React, { Route, Routes } from 'react-router-dom';
import Landing from '@pages/landing/landing';
import Forum from '@pages/forum/forum';
import Game from '@pages/game/game';
import LeaderBoard from '@pages/leaderboard/leaderboard';
import Profile from '@pages/profile/profile';
import Signin from '@pages/signin/signin';
import Signup from '@pages/signup/signup';
import Error from '@pages/error/error';
import Layout from '@/layout/layout';

export enum RoutePaths {
    LANDING = '/',
    FORUM = '/forum/:page',
    GAME = '/game',
    LEADERBOARD = '/leaderboard',
    PROFILE = '/profile',
    SIGNIN = '/signin',
    SIGNUP = '/signup',
    NOT_FOUND = '/*',
    SERVER_ERROR = '/error',
}

const Router = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route path={RoutePaths.LANDING} element={<Landing />} />
            <Route path={RoutePaths.SIGNIN} element={<Signin />} />
            <Route path={RoutePaths.SIGNUP} element={<Signup />} />
            <Route path={RoutePaths.SERVER_ERROR} element={<Error code={500} />} />
            <Route path={RoutePaths.NOT_FOUND} element={<Error code={404} />} />        
            <Route path={RoutePaths.FORUM} element={<Forum />} />
            <Route path={RoutePaths.PROFILE} element={<Profile />} />
            <Route path={RoutePaths.GAME} element={<Game />} />
            <Route path={RoutePaths.LEADERBOARD} element={<LeaderBoard />} />
        </Route>
    </Routes>
);

export default Router;
