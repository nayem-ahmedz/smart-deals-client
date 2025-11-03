import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

export default function PrivateRoute({children}){
    const { currentUser } = useContext(AuthContext);
    if(!currentUser){
        return <Navigate to='/login' />
    }
    return(children);
}