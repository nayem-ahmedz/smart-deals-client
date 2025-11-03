import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import Root from "../layout/Root";
import SuspenseWrapper from "../comps/utils/SuspenseWrapper";
import PrivateRoute from "./PrivateRoute";
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../comps/auth/Login'));
const Register = lazy(() => import('../comps/auth/Register'));
const NoPage = lazy(() => import('../pages/NoPage'));
const AllProducts = lazy(() => import('../pages/AllProducts'));
const MyProducts = lazy(() => import('../pages/MyProducts'));
const MyBids = lazy(() => import('../pages/MyBids'));
const CreateProducts = lazy(() => import('../pages/CreateProducts'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, element: <SuspenseWrapper><Home /></SuspenseWrapper> },
      { path: '/login', element: <SuspenseWrapper><Login /></SuspenseWrapper> },
      { path: '/register', element: <SuspenseWrapper><Register /></SuspenseWrapper> },
      { path: '/all-products', element: <PrivateRoute> <SuspenseWrapper><AllProducts /></SuspenseWrapper> </PrivateRoute> },
      { path: '/my-products', element: <PrivateRoute> <SuspenseWrapper><MyProducts /></SuspenseWrapper> </PrivateRoute> },
      { path: '/my-bids', element: <PrivateRoute> <SuspenseWrapper><MyBids /></SuspenseWrapper> </PrivateRoute> },
      { path: '/create-products', element: <PrivateRoute> <SuspenseWrapper><CreateProducts /></SuspenseWrapper> </PrivateRoute> },
      { path: '/*', element: <SuspenseWrapper><NoPage /></SuspenseWrapper> }
    ]
  }
]);