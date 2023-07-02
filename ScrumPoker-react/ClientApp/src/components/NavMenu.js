import React from 'react';
import { Collapse, Navbar, NavItem, NavLink } from 'reactstrap';
import {Link, useLocation} from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  const location = useLocation();
  
  return(
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navBar" container light>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
            { location.pathname === '/game' &&
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                  </NavItem>
                </ul>
            }
          </Collapse>
        </Navbar>
      </header>
  )
}

export default NavMenu