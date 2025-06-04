// Logo, Home, Profile, Friends             Logout

import './Navbar.css';
import logo from '../assets/acebook.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">Profile</a></li>
          <li><a href="/contact">Friends</a></li>
        </ul>
      </div>
      <div className='navbar-right'>
        <ul>
          <li><a href="/logout">Log Out</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;