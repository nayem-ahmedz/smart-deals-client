import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
    const { currentUser, logoutUser, loading } = useContext(AuthContext);
    // console.log(currentUser)
    const navLinks = <>
        <li> <NavLink to='/'>Home</NavLink> </li>
        <li> <NavLink to='/all-products'>All Products</NavLink> </li>
        <li> <NavLink to='/my-products'>My Products</NavLink> </li>
        <li> <NavLink to='/my-bids'>My Bids</NavLink> </li>
        <li> <NavLink to='/create-products'>Create Products</NavLink> </li>
    </>;
    const handleLogout = () => {
        logoutUser()
            .then(() => console.log('logout succesfully'))
            .catch(error => console.log(error));
    }
    return (
        <header className="bg-base-100 shadow-sm">
            <nav className="navbar containerr">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl gap-0"> Smart<span className="text-primary">Deals</span> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    {
                        loading ? <span className="loading loading-dots loading-xl mr-3"></span> : currentUser ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt='alt' src={currentUser.photoURL}/>
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li> <button onClick={handleLogout}>Logout</button> </li>
                            </ul>
                        </div> : <>
                            <Link to='/login' className="btn">Login</Link>
                            <Link to='/register' className="btn">Register</Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    );
}