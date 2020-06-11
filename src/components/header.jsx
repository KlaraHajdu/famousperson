import React from "react";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";
import HowToPlay from "./howToPlay"; 

const Styles = styled.div`
    .navbar {
        background-color: rgba(255, 255, 255, 0.3);
    }
    #collapsible-nav-dropdown {
        color: darkgrey;
    }

    .nav-link {
        color: darkgrey;
    }
`;

export default function Header() {
    const [howToPlayModalOpen, setHowToPlayModalOpen] = useContext(HowToPlayModalOpenContext);

    const clickOpenHowToPlayModal = () => {
        console.log("Clicked");
        console.log(howToPlayModalOpen);
        setHowToPlayModalOpen(true);
        console.log(howToPlayModalOpen);
    };

    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand>Famous person guessing game</Navbar.Brand>
                <Nav.Link onClick={clickOpenHowToPlayModal}>How to play</Nav.Link>
                <NavDropdown title="Play" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#start-a-game">Start a new game as a game master</NavDropdown.Item>
                    <NavDropdown.Item href="#join-a-game">Join a game</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
            <HowToPlay/>
        </Styles>
    );
}
