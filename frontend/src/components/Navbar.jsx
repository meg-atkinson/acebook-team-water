// Logo, Home, Profile, Friends             Logout

import './Navbar.css';
import logo from '../assets/Acebook4.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><a href="/feed">Home</a></li>
          <li><a href="/users">Profile</a></li>
          <li><a href="/friends">Friends</a></li>
        </ul>
      </div>
      <div className='navbar-right'>
        <ul>
          <li><a href="/login">Log Out</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;