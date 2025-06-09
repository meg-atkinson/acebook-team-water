// Logo, Home, Profile, Friends             Logout

import './Navbar.css';
import logo from '../assets/Acebook4.png';
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><a href="/feed">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/friends">Friends</a></li>
        </ul>
      </div>
      <div className='navbar-right'>
        <ul>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;