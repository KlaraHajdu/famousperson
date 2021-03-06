import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { appFirebase } from "../../database.js";
import { GamePhaseContext } from "../contextProviders/GamePhaseProvider";
import { gamePhases } from "../../gamePhasesObject";
import { getRandomNumberFromTo } from "../../util/randomUtil.js";
import { startGame } from "../../actions/index";
import { useDispatch } from "react-redux";

export default function StartGame() {
    const [name, setName] = useState("");
    const [helperText, setHelperText] = useState();

    let gameId;

    const setGamePhase = useContext(GamePhaseContext)[1];

    const dispatch = useDispatch();

    const saveName = (e) => {
        let name = e.target.value;
        if (name.length === 0) setHelperText("Name cannot be empty!")
        else if (name.length > 15) setHelperText("Name too long!");
        else {
            setName(e.target.value);
            setHelperText(null);
        }
    };

    const handleNewGameCreation = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Game is successfully created");
            dispatch(startGame(name, gameId));
            sessionStorage.setItem("gameId", gameId);
            sessionStorage.setItem("gameMaster", name);
            sessionStorage.setItem("ownName", name);
            setGamePhase(gamePhases.waitingRoom);
        }
    };

    const handleIdCheckError = (err) => {
        alert("Something went wrong :(");
        console.log(err);
    };

    const doesGameIdAlreadyExist = (snapshot) => {
        return !!snapshot.val();
    };

    const generateId = () => {
        let generatedId;
        do {
            generatedId = getRandomNumberFromTo(1000, 10000);
        } while (appFirebase.databaseApi.readOnce(`games/${generatedId}`, doesGameIdAlreadyExist, handleIdCheckError));
        gameId = generatedId;
    };

    const createNewGame = () => {
        if (helperText === null) {
            generateId();
            let body = {
                gameMaster: name,
                gamePhase: "waitingRoom",
            };
            appFirebase.databaseApi.create(`games/${gameId}`, body, handleNewGameCreation);
        }
    };

    return (
        <div className="main-tile">
            <h4>Start a new game as a game master</h4>
            <Form>
                <Form.Group controlId="formGameMasterName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        onChange={saveName}
                        type="text"
                        placeholder="Your name that will appear during the game"
                        autoComplete="off"
                    />
                    <Form.Text muted>
                        {helperText}
                    </Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={createNewGame}>
                    Start a new game
                </Button>
            </Form>
        </div>
    );
}
