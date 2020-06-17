import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { GameContext } from "./contextProviders/GameProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { appFirebase } from "../database.js";
import { gamePhases } from "../gamePhasesObject";

const Styles = styled.div`
    .container {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 30, 30, 30, 30;
        margin: 100;
        border-radius: 3px;
    }
`;

function JoinGame() {
    const setGame = useContext(GameContext)[1];

    const setGamePhase = useContext(GamePhaseContext)[1];

    const [ownName, setOwnName] = useState("");

    const [gameId, setGameId] = useState("");

    const [error, setError] = useState("");

    const saveOwnName = (e) => {
        if (ownName) setError("");
        setOwnName(e.target.value);
    };

    const saveGameId = (e) => {
        setGameId(e.target.value);
    };

    const checkSnapshot = (snapshot) => {
        if (!!snapshot.val() === true) {
            console.log(snapshot.val());
            setGame({ gameId: gameId, ownName: ownName });
            setGamePhase(gamePhases.waitingRoom);
        } else {
            alert("Wrong ID!");
            setGameId("");
        }
    };

    const verifyGameId = (path) => {
        appFirebase.databaseApi.checkIfExists(path, checkSnapshot);
    };

    const handleJoinGame = () => {
        if (!ownName) setError("Cannot be empty!");
        if (gameId && ownName) verifyGameId(`games/${gameId}`);
    };

    return (
        <Styles>
            <Container>
                <h4>Join a game</h4>
                <Form>
                    <Form.Group controlId="formPlayerName">
                        <Form.Label>Your name {error && <div style={{ color: "red", fontSize:"8" }}> {error}</div>}</Form.Label>
                        <Form.Control
                            onChange={saveOwnName}
                            type="text"
                            placeholder="Your name that will appear during the game"
                        />
                    </Form.Group>
                    <Form.Group controlId="formGameID">
                        <Form.Label>Game ID</Form.Label>
                        <Form.Control
                            onChange={saveGameId}
                            value={gameId}
                            type="text"
                            placeholder="The game ID you received from the game master"
                        />
                    </Form.Group>
                    <Button variant="warning" onClick={handleJoinGame}>
                        Join the game
                    </Button>
                </Form>
            </Container>
        </Styles>
    );
}

export default JoinGame;
