import React from "react";
import { useContext, useEffect, useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { GameContext } from "./contextProviders/GameProvider";
import HowToPlay from "./HowToPlay";
import { gamePhases } from "../gamePhasesObject";
import { appFirebase } from "../database.js";
import { useSelector, useDispatch } from "react-redux";
import { joinGame, joinOwnTeam, startGame } from "../actions";

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
    const [game, setGame] = useContext(GameContext);
    const gameR = useSelector((state) => state.gameReducer);
    const dispatch = useDispatch();

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

    const joinGame0 = () => {
        setGamePhase(gamePhases.joinGame);
    };

    const handleGamePhaseResult = useCallback((snapshot) => {
        const DBGamePhase = snapshot.val();

        if (game ? DBGamePhase !== game.gamePhase : false) {
            setGamePhase(gamePhases[DBGamePhase]);
        }
    });

    const updateDone = (err) => {
        if (!!err) console.log(err);
        else console.log("Gamephase set to playGame in DB");
    };

    function joinDummyGameAsGameMaster() {
        dispatch(startGame("Master", 8795));
        dispatch(joinOwnTeam("greenTeam"));
        setGame({
            ownName: "Master",
            gameId: 8795,
            ownTeam: "greenTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
            teamOnTurn: "greenTeam",
        });
    }

    const joinDummyGameAsPlayer1 = () => {
        dispatch(joinGame("Player1", 8795, "Master"));
        dispatch(joinOwnTeam("blueTeam"));
        setGame({
            ownName: "Player1",
            gameId: 8795,
            ownTeam: "blueTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });
    };

    const setTeamInfos = (snapshot) => {
        const teamsDB = snapshot.val();
        const ownTeam = teamsDB.greenTeam.includes(gameR.ownName) ? "greenTeam" : "blueTeam";

        //let teamOnTurn = game.teamOnTurn ? game.teamOnTurn : "";
        setGame({
            ...game,
            ownTeam,
            teams: {
                ...game.teams,
                greenTeam: teamsDB.greenTeam,
                blueTeam: teamsDB.blueTeam,
            },
        });
    };

    useEffect(() => {
        console.log(gameR && gameR.gameId);

        if (gameR && gameR.gameId === 8795) {
            appFirebase.databaseApi.update(`games/${game ? gameR.gameId : 0}`, { gamePhase: "playGame" }, updateDone);
            //appFirebase.databaseApi.readOn(`games/${gameR.gameId}/teams`, setTeamInfos); //párhuzamosan nem tudom módosítani a game-et, de emiatt nem fog frissülni a delete player táblázat dev módban
        }
        appFirebase.databaseApi.readOn(`games/${gameR ? gameR.gameId : 0}/gamePhase`, handleGamePhaseResult);
    }, [gameR && gameR.gameId]); //gameR && gameR.gameId

    const joinDummyGameAsPlayer2 = () => {
        dispatch(joinGame("Player2", 8795, "Master"));
        dispatch(joinOwnTeam("greenTeam"));
        setGame({
            ownName: "Player2",
            gameId: 8795,
            ownTeam: "greenTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });
    };

    const joinDummyGameAsPlayer3 = () => {
        dispatch(joinGame("Player3", 8795, "Master"));
        dispatch(joinOwnTeam("blueTeam"));
        setGame({
            ownName: "Player3",
            gameId: 8795,
            ownTeam: "blueTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });
    };

    return (
        <Styles>
            <Navbar expand="lg">
                <Nav.Link onClick={goToHome}>Famous person guessing game</Nav.Link>
                <Nav.Link onClick={clickOpenHowToPlayModal}>How to play</Nav.Link>
                <NavDropdown title="Play" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={startGameAsMaster}>Start a new game as a game master</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinGame0}>Join a game</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="For development" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={joinDummyGameAsGameMaster}>
                        Join a dummy game as game master
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={joinDummyGameAsPlayer1}>Join a dummy game as 1</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinDummyGameAsPlayer2}>Join a dummy game as 2</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinDummyGameAsPlayer3}>Join a dummy game as 3</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
            <HowToPlay />
        </Styles>
    );
}
