import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

export default function PrivateRoute({children}){
    const { currentUser, loading } = useContext(AuthContext);
    if(loading){
        return;
    }
    if(!currentUser){
        return <Navigate to='/login' />
    }
    return(children);
}