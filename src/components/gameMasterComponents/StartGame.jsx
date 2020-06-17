import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { appFirebase } from "../../database.js";
import { GameContext } from "../contextProviders/GameProvider";
import { GamePhaseContext } from "../contextProviders/GamePhaseProvider";
import { gamePhases } from "../../gamePhasesObject";
import { getRandomNumberFromTo } from "../../util/randomUtil.js";

const Styles = styled.div`
  .container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30, 30, 30, 30;
    margin: 100;
    border-radius: 3px;
  }
`;

export default function StartGame() {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState(null);

  const setGame = useContext(GameContext)[1];

  const setGamePhase = useContext(GamePhaseContext)[1];

  const saveName = (e) => {
    setName(e.target.value);
  };

  const handleNewGameCreation = (err) => {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Game is successfully created");
      setGame({ gameMaster: name, gameId: gameId });
      setGamePhase(gamePhases.waitingRoom);
    }
  };

  const handleIdCheckError = (err) => {
      alert('Something went wrong :(');
      console.log(err);

  };

  const isGameIdAlreadyExists = (snapshot) => {
    return !!snapshot.val()
  };

  const generateId = () => {
    let gameId;    
      do {
        gameId = getRandomNumberFromTo(1000, 10000)
      }
      while (appFirebase.databaseApi.readOnce(`games/${gameId}`, isGameIdAlreadyExists, handleIdCheckError)) ;
      setGameId(gameId);
  };


  const createNewGame = () => {
    if (name !== "") {
      generateId();
      let body = {
        gameMaster: name,
      };
    appFirebase.databaseApi.create(`games/${gameId}`, body, handleNewGameCreation);
    }
  };

  return (
    <Styles>
      <Container>
        <h4>Start a new game as a game master</h4>
        <Form>
          <Form.Group controlId='formGameMasterName'>
            <Form.Label>Your name</Form.Label>
            <Form.Control
              onChange={saveName}
              type='text'
              placeholder='Your name that will appear during the game'
            />
          </Form.Group>
          <Button variant='warning' onClick={createNewGame}>
            Start a new game
          </Button>
        </Form>
      </Container>
    </Styles>
  );
}
