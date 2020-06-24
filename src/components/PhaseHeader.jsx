import React, { useContext } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import Badge from "react-bootstrap/Badge";


export default function PhaseHeader(props) {
    const game = useContext(GameContext)[0];

  return (
    <div>
        <h4>Hello {game.ownName}!</h4>
        <hr />
      <h2>
        {props.title} <Badge variant='secondary'>{game.gameId}</Badge>
      </h2>
      <h5>Game master: {game.gameMaster}</h5>
      <hr />
    </div>
  );
}
