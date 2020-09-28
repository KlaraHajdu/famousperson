import React, { useContext } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import { ScoreContext } from "./contextProviders/ScoreProvider";
import { TeamContainerInThreeColumns, gameTheme } from "../static/myStyle";
import { useSelector } from 'react-redux';


export default function TeamContainer(props) {
  const game = useContext(GameContext)[0];
  const scores = useContext(ScoreContext)[0];
  const score = useSelector(state => state.scoreReducer);

  return (
    <TeamContainerInThreeColumns
      backgroundColor={
        props.team === "greenTeam"
          ? gameTheme.greenBackgroundColor
          : gameTheme.blueBackgroundColor
      }
    >
      <h4>{props.team === "greenTeam" ? "Green team" : "Blue team"}</h4>
      <div>Members: {game.teams && game.teams[props.team].join(", ")}</div>

      <div>Score: {score && props.team === "greenTeam" ? score && score.greenTeamScore : score && score.blueTeamScore}</div>
    </TeamContainerInThreeColumns>
  );
}
