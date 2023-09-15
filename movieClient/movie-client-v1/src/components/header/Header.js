import React, { useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import {NavLink, Navigate, useNavigate} from "react-router-dom";
import { isLoggedIn } from "../auth/AuthActions";
import "./Header.css";

const Header = () => {
    const  navigate = useNavigate();
    const loginResult = isLoggedIn();
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className={loginResult ? "nav-link" : "nav-link hide" } to="/Watchlist">Watch List</NavLink>
                </Nav>
                <Button className={loginResult ? "hide" : ""} variant="outline-info" onClick= {() => navigate(`/Login`)}>Login</Button>
                <Button className={loginResult ? "hide" : ""} variant="outline-info" onClick= {() => navigate(`/Register`)}>Register</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header