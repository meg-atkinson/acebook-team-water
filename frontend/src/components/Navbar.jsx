// Logo, Home, Profile, Friends             Logout

import './Navbar.css';
import logo from '../assets/Acebook4.png';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../App';
import { SearchBar } from './searchbar/SearchBar';
import { SearchResultsList } from './searchbar/SearchResultsList';
import { useState } from 'react';


function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [input, setInput] = useState("")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const [results, setResults] = useState([]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><a href="/feed">Home</a></li>
          {/* Only show profile link if user is loaded */}
          <li>
            {user ? (
              <a href={`/profile/${user.id}`}>Profile</a>
            ) : (
              <span className="loading-profile-link">Profile</span>
            )}
          </li>
          <li><a href="/friends">Friends</a></li>
        </ul>
        <ul className='search-bar-container'>
        <SearchBar input={input} setInput={setInput} setResults={setResults}/>
        <SearchResultsList setResults={setResults} results={results} setInput={setInput} />
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