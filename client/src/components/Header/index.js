import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/td-logo.png';
import Auth from '../../utils/auth';
//import hardwareicon from '../../assets/icons/server.png';
//import softwareicon from '../../assets/icons/save.png';
//import serviceicon from '../../assets/icons/cloud.png';


const Header = () => {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <nav className="navbar">
                <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
                {Auth.loggedIn() ? (
                    <>
                        <ul className="navlist">
                            <li className="navitem"><Link to="/hardware">Hardware</Link></li>
                            <li className="navitem"><Link to="/software">Software</Link></li>
                            <li className="navitem"><Link to="/service">Services</Link></li>
                            <a className="navitem" href="/" onClick={logout}>Logout</a>
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="navlist">
                            <Link to="/login" className="navitem">Login</Link>
                            <Link to="/signup" className="navitem">Signup</Link>
                        </ul>
                    </>
                )}   
            </nav>
        </header>
    );
}

export default Header;