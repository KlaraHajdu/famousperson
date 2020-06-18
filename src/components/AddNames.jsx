import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GameContext } from "./contextProviders/GameProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { appFirebase } from "../database.js";
import { gamePhases } from "../gamePhasesObject";

function AddNames() {
    const [game, setGame] = useContext(GameContext);

    const [nameToSubmit, setNameToSubmit] = useState("");

    const setGamePhase = useContext(GamePhaseContext)[1];

    const [teamNamesNumber, setTeamNamesNumber] = useState("0");

    const saveNameToSubmit = (e) => {
        setNameToSubmit(e.target.value);
    };

    const actAfterNameAdded = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Name added successfully");
            setNameToSubmit("");
        }
    };

    const handleTeamNamesResult = (snapshot) => {
        if (snapshot.val()) {
            console.log("from handle team names result: " + Object.keys(snapshot.val()));
            setTeamNamesNumber(Object.keys(snapshot.val()).length);
        }
    };

    const handleNamesResult = (snapshot) => {
        if (snapshot.val()) {
            if (Object.keys(snapshot.val()).length === 10) {
                setGamePhase(gamePhases.playGame);
            }
            console.log("from handle all names result: " + Object.keys(snapshot.val()));
        }
    };

    const handleSubmitName = () => {
        if (nameToSubmit) {
            appFirebase.databaseApi.create(`games/${game.gameId}/names/${nameToSubmit}`, true, actAfterNameAdded);
            appFirebase.databaseApi.create(`games/${game.gameId}/${game.ownTeam}Names/${nameToSubmit}`, true);
        }
    };
    
    useEffect(() => {
        setGame({...game, ownTeam : "blue"});
        appFirebase.databaseApi.readOn(`games/${game.gameId}/names`, handleNamesResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/${game.ownTeam}Names`, handleTeamNamesResult);
    }, []);

    if (teamNamesNumber === 5)
        return (
            <Container>
                <Container className="fixer">
                    <div>Please wait for the other team to finish uploading their names</div>
                    <Button variant="warning" onClick={() => setGamePhase(gamePhases.playGame)}>
                        Open the playGame component
                    </Button>
                </Container>
            </Container>
        );
    return (
        <Container>
            <Container className="fixer">
                <h4>Add names to the game</h4>
                <div>Your team has added {teamNamesNumber} names so far</div>
                <Form>
                    <Form.Group controlId="formPlayerName">
                        <Form.Control
                            onChange={saveNameToSubmit}
                            value={nameToSubmit}
                            type="text"
                            placeholder="Someone to be guessed in the game"
                            style={{ width: "500px" }}
                        />
                    </Form.Group>
                    <Button variant="warning" onClick={handleSubmitName}>
                        Submit name
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default AddNames;
