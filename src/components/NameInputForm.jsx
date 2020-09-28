import React, { useEffect, useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { useSelector } from 'react-redux';

export default function NameInputForm(props) {
  const nameNumber = props.nameNumber;
  const game = useContext(GameContext)[0];
  const [nameToSubmit, setNameToSubmit] = useState("");
  const [teamNamesNumber, setTeamNamesNumber] = useState(0);
  const gameR = useSelector((state) => state.gameReducer);

  const saveNameToSubmit = (e) => {
    setNameToSubmit(e.target.value);
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
      console.log(
        `Name ${nameToSubmit} added successfully to the ${gameR.ownTeam} names`
      );
      setNameToSubmit("");
    }
  };

  const submitName = () => {
    if (nameToSubmit !== "") {
      appFirebase.databaseApi.create(
        `games/${gameR.gameId}/names/${nameToSubmit}`,
        true,
        actAfterNameSubmittedToAllNames
      );
      appFirebase.databaseApi.create(
        `games/${gameR.gameId}/${gameR.ownTeam}Names/${nameToSubmit}`,
        true,
        actAfterNameSubmittedToTheTeamNames
      );
    }
  };

  const handleTeamNamesResult = (snapshot) => {
    if (snapshot.val()) {
      console.log(
        "from handle team names result: " + Object.keys(snapshot.val())
      );
      setTeamNamesNumber(Object.keys(snapshot.val()).length);
    }
  };

  const checkHowManyNamesSentByMyTeam = () => {
    appFirebase.databaseApi.readOn(
      `games/${gameR.gameId}/${gameR.ownTeam}Names`,
      handleTeamNamesResult
    );
  };

  useEffect(() => {
    if (gameR.ownTeam) checkHowManyNamesSentByMyTeam();
  }, [gameR.ownTeam]);

  return (
      teamNamesNumber === nameNumber / 2 ? (
        <div>
          <p>Your team already submitted {nameNumber / 2} names.</p>
          <p>Please wait for the other team to finish uploading their names.</p>
        </div>
      ) : (
        <div>
          <div>Your team has added {teamNamesNumber} names so far</div>
          <Form>
            <Form.Group controlId='formPlayerName'>
              <Form.Control
                onChange={saveNameToSubmit}
                value={nameToSubmit}
                type='text'
                placeholder='Someone to be guessed in the game'
              />
            </Form.Group>
            <Button variant='warning' onClick={submitName}>
              Submit name
            </Button>
          </Form>
        </div>
      )
  );
}
