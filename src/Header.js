import './App.css';
import {
  Link
} from "react-router-dom";
function Header() {
  return (
          <ul id = 'navbar' className="navbar-nav flex  pl-0 list-style-none mx-auto max-w-5xl mb-5">  
            <li className="nav-item p-2">
              <Link to='/'>
                  <div className = 'nav-links nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0'>
                      Home
                  </div>
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to='/addproduct'>
                  <div className = 'nav-links nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0'>
                      Add Product
                  </div>
              </Link>
          </li>
          </ul>
  )
}

export default Header;
