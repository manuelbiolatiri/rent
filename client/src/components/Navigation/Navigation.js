import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Tilt from 'react-tilt'
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { createHashHistory } from "history";






const Navigation = (props) => {

  // const History = useHistory();
  const history = createHashHistory();

  const handleClick = (event) => {
    event.preventDefault();
    delete localStorage.jwt
    history.go("/");
  }

  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
 

      return (
        <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 rounded bg-transparent"
      expand="lg"
    >
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 60, width: 60 }} >
						 	<div className="Tilt-inner"><img src="flashtokenlogo.jpg" alt=""/></div>
						</Tilt>
      {/* <Button color="info" src={'/bitcoin.png'}>
      </Button> */}
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={"/home"}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/profile"}>
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/sign_up"}>
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/sign_in"}>
              Sign In
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/signout"} onClick={handleClick}>
              Sign Out
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    
      );
}

export default Navigation;