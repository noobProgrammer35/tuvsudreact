import React, {Component} from "react"
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem

} from "reactstrap"

class NavHeader extends Component
{
    render(){
        return (
        <Navbar color='dark' dark expand=''>
             <NavbarBrand href="/">
                <img src ={'https://www.tuvsud.com/images/TS_TS_f_4c.png'} width="50" height="50"  />
                <span style={{ paddingLeft:"10px",fontSize:"24px",fontWeight:"400"}}>Forms</span>
            </NavbarBrand>
        </Navbar>
        );
       
    }
}
export default NavHeader;