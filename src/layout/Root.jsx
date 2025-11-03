import './root.css';
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import AuthProvider from '../context/AuthProvider';

export default function Root(){
    return(
        <AuthProvider>
            <Header />
            <main className='containerr'>
                <Outlet />
            </main>
            <Footer />
        </AuthProvider>
    );
}