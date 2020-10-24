import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { appFirebase } from "../database.js";
import { useSelector } from "react-redux";

export default function NameInputForm(props) {
    const nameNumber = props.nameNumber;
    const [nameToSubmit, setNameToSubmit] = useState("");
    const [teamNamesNumber, setTeamNamesNumber] = useState(0);
    const [helperText, setHelperText] = useState("");
    const game = useSelector((state) => state.gameReducer);

    const saveNameToSubmit = (e) => {
        let name = e.target.value;
        if (name.length > 30) setHelperText("Name too long!");
        else {
            setNameToSubmit(e.target.value);
            setHelperText(null);
        }
    };

    const actAfterNameSubmittedToAllNames = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log(`Name ${nameToSubmit} added successfully to all names`);
            setNameToSubmit("");
        }
    };

    const actAfterNameSubmittedToTheTeamNames = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log(`Name ${nameToSubmit} added successfully to the ${game.ownTeam} names`);
            setNameToSubmit("");
        }
    };

    const checkIfNameIsAlreadySubmitted = (snapshot) => {
        if (!snapshot.exists()) createNewName();
        else setNameToSubmit("");
    };

    const createNewName = () => {
        appFirebase.databaseApi.create(
            `games/${game.gameId}/names/${nameToSubmit}`,
            true,
            actAfterNameSubmittedToAllNames
        );
        appFirebase.databaseApi.create(
            `games/${game.gameId}/${game.ownTeam}Names/${nameToSubmit}`,
            true,
            actAfterNameSubmittedToTheTeamNames
        );
    };

    const submitName = () => {
        if (nameToSubmit !== "") {
            appFirebase.databaseApi.readOnce(
                `games/${game.gameId}/names/${nameToSubmit}`,
                checkIfNameIsAlreadySubmitted
            );
        }
    };

    const handleTeamNamesResult = (snapshot) => {
        if (snapshot.val()) {
            setTeamNamesNumber(Object.keys(snapshot.val()).length);
        }
    };

    useEffect(() => {
        const checkHowManyNamesSentByMyTeam = () => {
            appFirebase.databaseApi.readOn(`games/${game.gameId}/${game.ownTeam}Names`, handleTeamNamesResult);
        };

        if (game.ownTeam) checkHowManyNamesSentByMyTeam();
    }, [game.gameId, game.ownTeam]);

    return teamNamesNumber === nameNumber / 2 ? (
        <div>
            <p>Your team has already submitted {nameNumber / 2}.</p>
            <p>Please wait for the other team to finish uploading their names.</p>
        </div>
    ) : (
        <div>
            <div>
            Your team has added {teamNamesNumber} {teamNamesNumber > 1 ? "names" : "name"} from the {nameNumber/2}.
            </div>
            <Form>
                <Form.Group controlId="formPlayerName">
                    <Form.Control
                        onChange={saveNameToSubmit}
                        value={nameToSubmit}
                        type="text"
                        placeholder="Someone to be guessed in the game"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Text muted>{helperText}</Form.Text>
                <Button variant="warning" onClick={submitName}>
                    Submit name
                </Button>
            </Form>
        </div>
    );
}
