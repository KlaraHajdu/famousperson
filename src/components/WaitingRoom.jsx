import React, { useContext, useState } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { appFirebase } from "../database.js";

const Styles = styled.div`
  .container {
    padding: 10px 40px;
    background-color: rgba(255, 255, 255, 0.9);
  }
  table {
  }
`;

function WaitingRoom() {
  const game = useContext(GameContext)[0];
  const [players, setPlayers] = useState([]);

  const handleResult = (snapshot) => {
    if (
      snapshot.val() &&
      JSON.stringify(snapshot.val()) !== JSON.stringify(players)
    ) {
      console.log(snapshot.val());
      setPlayers(snapshot.val());
    }
  };

  appFirebase.databaseApi.readOn(`games/${game.gameId}/players`, handleResult);

  return (
    <Styles>
      <Container>
        <h2>
          Waiting room <Badge variant='secondary'>{game.gameId}</Badge>
        </h2>
        <h4>Game master: {game.gameMaster}</h4>
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant='warning'>Start game</Button>
      </Container>
    </Styles>
  );
}

export default WaitingRoom;
