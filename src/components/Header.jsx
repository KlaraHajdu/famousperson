import React from "react";
import { useContext, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import HowToPlay from "./HowToPlay";
import { gamePhases } from "../gamePhasesObject";
import { appFirebase } from "../database.js";
import { useSelector, useDispatch } from "react-redux";
import { joinGame, joinOwnTeam, startGame } from "../actions/index";
import { setGreenTeam, setBlueTeam } from '../actions/teamActions';

const Styles = styled.div`
    .navbar {
        background-color: rgba(70, 70, 70, 0.3);
        height: 3.5em;
    }
    .navbar-brand {
        color: silver;
        font-weight: semibold;
        font-size: 2em;
    }

    .navbar-brand:hover {
        color: silver;
    }

    #collapsible-nav-dropdown {
        color: silver;
    }

    #nav-link {
        color: silver;
    }
`;

export default function Header() {
    const [gamePhase, setGamePhase] = useContext(GamePhaseContext);
    const game = useSelector((state) => state.gameReducer);
    const dispatch = useDispatch();

    const setHowToPlayModalOpen = useContext(HowToPlayModalOpenContext)[1];

    const clickOpenHowToPlayModal = () => {
        setHowToPlayModalOpen(true);
    };

    const startGameAsMaster = () => {
        setGamePhase(gamePhases.startGame);
    };

    const joinNewGame = (e) => {
        setGamePhase(gamePhases.joinGame);
    };

 
    
    useEffect(() => {
    const updateDone = (err) => {
        if (!!err) console.log(err);
        else console.log("Gamephase set to playGame in DB");
    };
    
        const handleGamePhaseResult = (snapshot) => {
            const DBGamePhase = snapshot.val();
    
            if (game && DBGamePhase !== gamePhase) {
                if (DBGamePhase) {
                    setGamePhase(gamePhases[DBGamePhase]);
                    sessionStorage.setItem("gamePhase", DBGamePhase);
                }
            }
        };
        
        const setTeamInfos = (snapshot) => {
            const teamsDB = snapshot.val();
            const ownTeam = teamsDB.greenTeam.includes(game.ownName) ? "greenTeam" : "blueTeam";
            dispatch(joinOwnTeam(ownTeam));
            dispatch(setGreenTeam(snapshot.val().greenTeam));
            dispatch(setBlueTeam(snapshot.val().blueTeam));
            
        };
        
        appFirebase.databaseApi.readOn(`games/${game ? game.gameId : 0}/gamePhase`, handleGamePhaseResult);
    }, [game && game.gameId]); //game && game.gameId
    
    return (
        <Styles>
            <Navbar expand="lg" className="justify-content-between">
                <Nav>
                    <Navbar.Brand>Guess!</Navbar.Brand>
                </Nav>
                <Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav.Link id="nav-link" onClick={clickOpenHowToPlayModal}>How to play</Nav.Link>
                        <Nav>
                            <NavDropdown alignRight title="Play" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={startGameAsMaster}>
                                    Start a new game as a game master
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={joinNewGame}>Join a game</NavDropdown.Item>
                            </NavDropdown>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
            <HowToPlay />
        </Styles>
    );
}
