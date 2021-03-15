import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { GiSonicShoes } from "react-icons/gi";
import { FaCartArrowDown } from "react-icons/fa";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import {
    logoutAction
} from "./../redux/actions";
import { withStyles } from "@material-ui/core/styles";

const Style = {
    root: {
        "& label.Mui-focused": {
            color: "#655143",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#655143",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#655143",
            },
            "&:hover fieldset": {
                borderColor: "#655143",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#655143",
            },
        },
        marginTop: "20px"
    },
};


class Header extends Component {
    state = {
        isOpen: false
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    handleClick = event => {
        event.preventDefault()
        localStorage.clear()
        this.props.logoutAction()
    }

    render() {
        return (
            <div>
                <Navbar className="bg-light px-5 shadow fixed-top" light expand="md">
                    <NavbarBrand href="/">
                        <span
                            className="font-weight-bold header-brand"
                            style={{ color: "#655143" }}
                        >
                            <GiSonicShoes /> SHOES.STORE
            </span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.props.dataUser.islogin ? (
                                <>
                                    <>
                                        <Link to="/history">
                                            <NavItem className="py-2 mx-2">History</NavItem>
                                        </Link>
                                        <NavItem className="py-2 mx-2">
                                            <Link to="/cart">
                                                <FaCartArrowDown
                                                    style={{ fontSize: "25px", color: "black" }}
                                                />
                                            </Link>
                                            {this.props.dataUser.cart.length ? (
                                                <Badge
                                                    style={{
                                                        position: "relative",
                                                        bottom: 10,
                                                        right: 5,
                                                        backgroundColor: "#fbab7e",
                                                    }}
                                                    className="px-1 rounded-circle text-center"
                                                >
                                                    {this.props.dataUser.cart.length}
                                                </Badge>
                                            ) : null}

                                        </NavItem>
                                    </>

                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>
                                            {this.props.dataUser.username}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <Link to='/history'>
                                                <DropdownItem>History</DropdownItem>
                                            </Link>
                                            <Link to='/'>
                                                <DropdownItem>Home</DropdownItem>

                                            </Link>
                                            <DropdownItem divider />
                                            <Link to='/'></Link>
                                            <DropdownItem onClick={this.handleClick}>LogOut</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                            ) : (
                                <>
                                    <NavItem className="mx-2">
                                        <Link to="/login">
                                            <button className=" bg-tombol rounded px-4 py-2 font-weight-bold">
                                                Login
                      </button>
                                        </Link>
                                    </NavItem>

                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const MaptstatetoProps = (state) => {
    return {
        dataUser: state.Auth,
    };
};


export default withStyles(Style)(
    connect(MaptstatetoProps, {
        logoutAction
    })(Header)
);