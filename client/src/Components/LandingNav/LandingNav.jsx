import './LandingNav.css'
import Button from '@mui/material/Button';
import logo from '../../assets/LandingLogo.png'
import { Link } from "react-router-dom";

export const LandingNav = () => {
  return (
    <nav className='navbar'>
    <div className='navbar-logo'>
        <img src={logo} alt='dz logo'></img>
    </div>
    <ul className="navbar-links">
        <li>Home</li>
        <li>About Us</li>
        <li>Terms & Privacy</li>
    </ul>
    <div className="navbar-buttons">
        <Link to='/Signin'>
        <Button 
        variant="outlined" 
        color="primary" 
        sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '5px', marginRight: '10px' }}
        >
        Log in
        </Button></Link>
        <Link to='/Signup'>
        <Button 
        variant="contained" 
        color="primary" 
        sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '5px' }}
        >
        Sign up
        </Button></Link>
    </div>
    </nav>
)
}   

