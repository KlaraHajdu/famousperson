import React from "react";
import { TeamContainerInThreeColumns, gameTheme } from "../static/myStyle";
import { useSelector } from 'react-redux';


export default function TeamContainer(props) {
  const greenTeam = useSelector((state) => state.teamReducer.greenTeam);
  const blueTeam = useSelector((state) => state.teamReducer.blueTeam);
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
      <div>Members: {props.team === "greenTeam" ? greenTeam.join(", "): blueTeam.join(", ")}</div>

      <div>Score: {score && props.team === "greenTeam" ? score && score.greenTeamScore : score && score.blueTeamScore}</div>
    </TeamContainerInThreeColumns>
  );
}
