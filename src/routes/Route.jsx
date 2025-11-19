import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import Root from "../layout/Root";
import SuspenseWrapper from "../comps/utils/SuspenseWrapper";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../comps/utils/ErrorPage";
import axiosInstance from "../hooks/axiosInstact";
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../comps/auth/Login'));
const Register = lazy(() => import('../comps/auth/Register'));
const NoPage = lazy(() => import('../pages/NoPage'));
const AllProducts = lazy(() => import('../pages/AllProducts'));
const MyProducts = lazy(() => import('../pages/MyProducts'));
const MyBids = lazy(() => import('../pages/MyBids'));
const CreateProducts = lazy(() => import('../pages/CreateProducts'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, element: <SuspenseWrapper><Home /></SuspenseWrapper>, errorElement: <ErrorPage /> },
      { path: '/login', element: <SuspenseWrapper><Login /></SuspenseWrapper> },
      { path: '/register', element: <SuspenseWrapper><Register /></SuspenseWrapper> },
      {
        path: '/all-products',
        loader: function(){ return axiosInstance.get('/products') },
        element: <SuspenseWrapper><AllProducts /></SuspenseWrapper> },
      {
        path: '/all-products/:id',
        loader: ({ params }) => axiosInstance.get(`/products/${params.id}`),
        element: <PrivateRoute><SuspenseWrapper> <ProductDetails /> </SuspenseWrapper></PrivateRoute>
      },
      { path: '/my-products', element: <PrivateRoute> <SuspenseWrapper><MyProducts /></SuspenseWrapper> </PrivateRoute> },
      { path: '/my-bids', element: <PrivateRoute> <SuspenseWrapper><MyBids /></SuspenseWrapper> </PrivateRoute> },
      { path: '/create-products', element: <PrivateRoute> <SuspenseWrapper><CreateProducts /></SuspenseWrapper> </PrivateRoute> },
      { path: '/*', element: <SuspenseWrapper><NoPage /></SuspenseWrapper> }
    ]
  }
]);