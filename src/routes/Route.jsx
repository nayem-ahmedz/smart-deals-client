import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../comps/auth/Login";
import Register from "../comps/auth/Register";
import NoPage from "../pages/NoPage";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: '/login', Component: Login },
      { path: '/register', Component: Register },
      { path: '/*', Component: NoPage }
    ]
  }
]);