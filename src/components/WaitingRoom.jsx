import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { appFirebase } from "../database.js";



function WaitingRoom() {
  const [game, setGame] = useContext(GameContext);
  const [players, setPlayers] = useState([]);


  const handleMasterNameResult = (snapshot) => {
        const masterName = snapshot.val();
      setGame({...game, gameMaster: masterName });
  };

  const handlePlayersResult = (snapshot) => {
    if (
      snapshot.val() &&
      JSON.stringify(snapshot.val()) !== JSON.stringify(players)
    ) {
      setPlayers(snapshot.val());
    }
  };

  const actAfterAddNewPlayer = (err) => {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Player added successfully");
    }
  };

  const handleMasterNameError = (err) => {
      console.log(err);
      alert("Something went wrong :(");
}

  useEffect(() => {
    appFirebase.databaseApi.create(
        `games/${game.gameId}/players/${game.ownName}`,
        true,
        actAfterAddNewPlayer
      );
      appFirebase.databaseApi.readOnce(`games/${game.gameId}/gameMaster`, handleMasterNameResult, handleMasterNameError);
      appFirebase.databaseApi.readOn(`games/${game.gameId}/players`, handlePlayersResult);
  }, [])


  return (
    <Container>
      <Container className="fixer">
        
        <h2>
          Waiting room <Badge variant='secondary'>{game.gameId}</Badge>
        </h2>
        <h4>Game master: {game.gameMaster}</h4>
        <Table striped bordered hover variant='dark'>
            {console.log(game)}
          <thead>
            <tr>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(players).map((player, index) => (
              <tr key={index}>
                <td>{player}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant='warning'>Start game</Button>
      </Container>
      </Container>

  );
}

export default WaitingRoom;
