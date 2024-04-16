import Main from "./pages/Main";
import Error from "./pages/Error";

// Пути для авторизованного пользователя
export const privateRoutes = [
    { path: "/", element: <Main />, exact: true },
    { path: "*", element: <Error />, exact: true }
]

// Пути для неавторизованного пользователя
export const publicRoutes = [
    { path: "/", element: <Main />, exact: true },
    { path: "*", element: <Error />, exact: true }
]