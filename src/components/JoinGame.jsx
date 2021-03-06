import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { appFirebase } from "../database.js";
import { useDispatch } from "react-redux";
import { joinGame } from "../actions/index";

function JoinGame() {
    const dispatch = useDispatch();

    const [ownName, setOwnName] = useState("");

    const [gameId, setGameId] = useState("");

    const [helperText, setHelperText] = useState("");

    const [gameIdHelperText, setGameIdHelperText] = useState("");

    const saveOwnName = (e) => {
        let nameInput = e.target.value;
        if (nameInput.length === 0) setHelperText("Name cannot be empty!");
        else if (nameInput.length > 15) setHelperText("Name too long!");
        else {
            setHelperText(null);
            setOwnName(nameInput);
        }
    };

    const saveGameId = (e) => {
        let gameIdInput = e.target.value;
        if (gameIdInput === "") setGameIdHelperText("Game ID cannot be empty!")
        else {
            setGameId(gameIdInput);
            setGameIdHelperText(null);
        }
    };

    
    const checkSnapshot = async (snapshot) => {
        if (!!snapshot.val()) {
            let playersSnapshot = await appFirebase.database().ref(`games/${gameId}/players`).once("value");
            let playersLowerCase = Object.keys(playersSnapshot.val()).map((name) => name.toLowerCase());
            if (playersLowerCase.includes(ownName.toLowerCase())) {
                setHelperText("This name is already taken, please choose another!");
            }
            else {
                dispatch(joinGame(ownName, gameId, snapshot.val().gameMaster));
                sessionStorage.setItem("gameId", gameId);
                sessionStorage.setItem("ownName", ownName);
                sessionStorage.setItem("gameMaster", snapshot.val().gameMaster);
            }
        } else {
            setGameIdHelperText("Wrong game ID!");
        }
    };

    const verifyGameId = (path) => {
        appFirebase.databaseApi.readOnce(path, checkSnapshot);
    };

    const handleJoinGame = () => {
        if (helperText === null && gameIdHelperText === null) verifyGameId(`games/${gameId}`);
    };

    return (
        <div className="main-tile">
            <h4>Join a game</h4>
            <Form>
                <Form.Group controlId="formPlayerName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        onChange={saveOwnName}
                        type="text"
                        placeholder="Your name that will appear during the game"
                        style={{ width: "100%" }}
                        autoComplete="off"
                    />
                    <Form.Text muted>{helperText}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formGameID">
                    <Form.Label>Game ID</Form.Label>
                    <Form.Control
                        onChange={saveGameId}
                        type="text"
                        placeholder="The game ID you received from the game master"
                        style={{ width: "100%" }}
                        autoComplete="off"
                    />
                    <Form.Text muted>{gameIdHelperText}</Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={handleJoinGame}>
                    Join the game
                </Button>
            </Form>
        </div>
    );
}

export default JoinGame;
