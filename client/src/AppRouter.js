import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';
import { AuthContext } from './AuthContext';
import Loader from './components/Loader';

// Компонент реализующий роутинг в приложении
const AppRouter = () => {
    const {user, setUser} = useContext(AuthContext);

    // Создание приватных роутов
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

    // Создание публичных роутов
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
        user
        ?
        app_private_routes
        :
        app_public_routes
    );
}

export default AppRouter;