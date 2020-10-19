import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { appFirebase } from "../database.js";
import { gamePhases } from "../gamePhasesObject";
import { useDispatch } from 'react-redux';
import { joinGame } from '../actions/index';

function JoinGame() {

    const dispatch = useDispatch();

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
        if (!!snapshot.val()) {
            dispatch(joinGame(ownName, gameId, snapshot.val().gameMaster ));
            sessionStorage.setItem("gameId", gameId);
            sessionStorage.setItem("ownName", ownName);
            sessionStorage.setItem("gameMaster", snapshot.val().gameMaster);
            setGamePhase(gamePhases.waitingRoom);
            sessionStorage.setItem("gamePhase", "waitingRoom")
        } else {
            alert("Wrong ID!");
            setGameId("");
        }
    };

    const verifyGameId = (path) => {
        appFirebase.databaseApi.readOnce(path, checkSnapshot);
    };

    const handleJoinGame = () => {
        if (!ownName) setError("Please write your name");
        if (gameId && ownName) verifyGameId(`games/${gameId}`);
    };

    return (
        <div className="main-tile">
            <h4>Join a game</h4>
            <Form>
                <Form.Group controlId="formPlayerName">
                    <Form.Label>
                        Your name {error && <div style={{ color: "red", fontSize: "8" }}> {error}</div>}
                    </Form.Label>
                    <Form.Control
                        onChange={saveOwnName}
                        type="text"
                        placeholder="Your name that will appear during the game"
                        style={{ width: "100%" }}
                        autocomplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="formGameID">
                    <Form.Label>Game ID</Form.Label>
                    <Form.Control
                        onChange={saveGameId}
                        value={gameId}
                        type="text"
                        placeholder="The game ID you received from the game master"
                        style={{ width: "100%" }}
                        autocomplete="off"
                    />
                </Form.Group>
                <Button variant="warning" onClick={handleJoinGame}>
                    Join the game
                </Button>
            </Form>
        </div>
    );
}

export default JoinGame;
