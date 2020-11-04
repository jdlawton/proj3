import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/td-logo.png';


const Header = () => {

    return (
        <header>
            <nav className="navbar">
                <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
                <ul className="navlist">
                    <li className="navitem"><Link to="/hardware">Hardware</Link></li>
                    <li className="navitem"><Link to="/software">Software</Link></li>
                    <li className="navitem"><Link to="/services">Services</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;