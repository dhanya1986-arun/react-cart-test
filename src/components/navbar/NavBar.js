

import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { Link,useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file

const NavBar = ({ isLoggedIn, isAdmin, onLogout, onSearch }) => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    onLogout(); // Call the passed onLogout prop (possibly clears user data or token)
    navigate('/login'); // Redirect to login page
  };


  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
      event.target.value = ''; // Clear input after search
    }
  };
 
 

console.log("nav"+isAdmin);
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <ShoppingCartIcon />
        <Typography variant="h6" className="title">
          upGrad Eshop
        </Typography>

        {/* Updated Search Input */}
       
          <div className="searchBox">
            <SearchIcon className="searchIcon" />
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={handleSearch}
              className="searchInput"
            />
          </div>
        
        <Link to="/" className="navLink">
          <Button color="inherit">Home</Button>
        </Link>

        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Link to="/add-products" className="navLink">
                <Button color="inherit">Add Products</Button>
              </Link>
            )}
           {/*} <Button className="logoutButton" onClick={onLogout}>Logout</Button>*/}
            <Button className="logoutButton" style={{width:'40px'}} onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login" className="navLink">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/signup" className="navLink">
              <Button color="inherit">Sign Up</Button>
            </Link>
          </>
        )}
      
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


