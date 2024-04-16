import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';
import { AuthContext } from './AuthContext';
import Loader from './components/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    const app_private_routes = (
        <main className="app_private">
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        exact={route.exact}
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
            </Routes>
        </main>
    );

    const app_public_routes = (
        <main className="app_public">
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        exact={route.exact}
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
            </Routes>
        </main>
    );
    
    return (
        isAuth
        ?
        app_private_routes
        :
        app_public_routes
    );
}

export default AppRouter;