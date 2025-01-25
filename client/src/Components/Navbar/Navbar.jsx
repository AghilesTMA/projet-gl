
import './Navbar.css'
import logo from '../../assets/SigninLogo.png'

export const Navbar = () => {
  return (
    <nav className='navbar'>
    <div className='navbar-logo'>
        <img src={logo} alt='dz logo'></img>
    </div>
    </nav>
  )
}