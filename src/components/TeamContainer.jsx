import React, { useContext } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import { TeamContainerInThreeColumns, gameTheme } from "../static/myStyle";

export default function TeamContainer(props) {
  const game = useContext(GameContext)[0];

  return (
    <TeamContainerInThreeColumns
      backgroundColor={
        props.team === "greenTeam"
          ? gameTheme.greenBackgroundColor
          : gameTheme.blueBackgroundColor
      }
      titleColor={props.team === "greenTeam" ? "green" : "blue"}
    >
      <h4>{props.team === "greenTeam" ? "Green team" : "Blue team"}</h4>
      <div>Members: {game.teams && game.teams[props.team].join(", ")}</div>

      <div>Score: {game.blueTeamScore && game.blueTeamScore}</div>
    </TeamContainerInThreeColumns>
  );
}
