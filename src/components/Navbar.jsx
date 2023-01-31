import { Link } from 'react-router-dom';

// styles 
import './Navbar.css'

import logo from "../assets/temple.svg"

const Navbar = () => {
  return (
    <div>
          <ul>
              <li className="logo">
                  <img src={logo} alt="logo" />
                  <span>The Dojo</span>
              </li>
              <li><Link to='/login' >Login</Link></li>
              <li><Link to='/logout' >Logout</Link></li>
        </ul>
    </div>
  )
}

export default Navbar