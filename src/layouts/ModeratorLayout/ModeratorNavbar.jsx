import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {  
  Nav,
} from "reactstrap";
import PropTypes from "prop-types";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./sideBarStyle.css";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
//import logo from "../../assets/logo3big.png";
//import logoFull from "../../assets/logo3full.png";
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class StudentNavbar extends Component {
  render() {
    // eslint-disable-next-line
    const { children, image, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          //full={{ src: logoFull, height: 40, alt: "Ejournal Logo" }}
          //minimized={{ src: logo, height: 40, alt: "Ejournal Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none mr-3">
            <NavLink to="#" className="nav-link"></NavLink>
          </NavItem>     */}
          <UncontrolledDropdown className="mr-3">
            <DropdownToggle className="dopdown-toggle" nav>
            <i class="fa fa-user-circle fa-3x"></i>
            </DropdownToggle>
            <DropdownMenu id="dropMenu1" className="dropdown-default" right>
              {/* <DropdownItem href="/#/student/profile">
                <i className="ml-1 icon-user"></i> Мій профіль
              </DropdownItem> */}
              <DropdownItem href="/#/" onClick={e => this.props.onLogout(e)}>
                Вихід <ExitToAppIcon className="ml-2"/> 
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

StudentNavbar.propTypes = propTypes;
StudentNavbar.defaultProps = defaultProps;

export default StudentNavbar;
