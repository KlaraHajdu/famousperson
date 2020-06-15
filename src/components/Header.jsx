import React from "react";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import HowToPlay from "./HowToPlay";
import { gamePhases } from "../gamePhasesObject";

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
    const setGamePhase = useContext(GamePhaseContext)[1];

    const setHowToPlayModalOpen = useContext(HowToPlayModalOpenContext)[1];

    const goToHome = () => {
        setGamePhase(null);
    };

    const clickOpenHowToPlayModal = () => {
        setHowToPlayModalOpen(true);
    };

    const startGameAsMaster = () => {
        setGamePhase(gamePhases.startGame);
    };

    const joinGame = () => {
        setGamePhase(gamePhases.joinGame);
    };

    return (
        <Styles>
            <Navbar expand="lg">
                <Nav.Link onClick={goToHome}>Famous person guessing game</Nav.Link>
                <Nav.Link onClick={clickOpenHowToPlayModal}>How to play</Nav.Link>
                <NavDropdown title="Play" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={startGameAsMaster}>Start a new game as a game master</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinGame}>Join a game</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
            <HowToPlay />
        </Styles>
    );
}
