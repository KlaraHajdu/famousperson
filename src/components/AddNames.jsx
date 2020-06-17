import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GameContext } from "./contextProviders/GameProvider";
import { appFirebase } from "../database.js";

function AddNames() {
    const [game, setGame] = useContext(GameContext);

    const [nameToSubmit, setNameToSubmit] = useState("");

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

    const handleNamesResult = (snapshot) => {
        if (snapshot.val()) setTeamNamesNumber(Object.keys(snapshot.val()).length);
    };
    const handleSubmitName = () => {
        if (nameToSubmit) { 
            appFirebase.databaseApi.create(`games/${game.gameId}/names/${nameToSubmit}`, true, actAfterNameAdded);
            appFirebase.databaseApi.create(`games/${game.gameId}/blue/nameAdded`, true);
        }
    };

    useEffect(() => {
        appFirebase.databaseApi.readOn(`games/${game.gameId}/names`, handleNamesResult);
    }, []);

    if (teamNamesNumber >= 11)
        return (
            <Container>
                <Container className="fixer">
                    <div>Please wait for the other team to finish uploading their names</div>
                </Container>
            </Container>
        );
    return (
        <Container>
            <Container className="fixer">
                <h4>Add names to the game</h4>
                <div>Your team has added {teamNamesNumber} players so far</div>
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
