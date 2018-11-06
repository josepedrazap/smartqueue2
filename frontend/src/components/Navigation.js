import React, { Component } from 'react';
import logo from '../public/share32.png';

import { Link } from 'react-router-dom'

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <a className="text-white ">
            SmartQueue - Bienvenido
          </a>

            <Nav className="ml-auto" navbar>
              <Link to="/home">
                <button type="button" className="btn btn-outline-primary ml-1" name="button"><i className="fas fa-home"></i></button>
              </Link>
              <Link to="/create_queue">
                <button type="button" className="btn_cq btn btn-outline-success ml-1" name="button"><i className="fas fa-plus-square"></i></button>
              </Link>
              <Link to="/maps">
                <button type="button" className="btn btn-outline-warning ml-1" name="button"><i className="fas fa-map-marked-alt"></i></button>
              </Link>
              <Link to="/exit">
                <button type="button" className="btn btn-outline-info ml-1" name="button"><i class="fas fa-sign-out-alt"></i></button>
              </Link>
            </Nav>
          </Navbar>
      </div>
    );
  }
}
export default Navigation;
