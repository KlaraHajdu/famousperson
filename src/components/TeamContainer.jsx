import React, { useContext } from "react";
import { GameContext } from "./contextProviders/GameProvider";

export default function TeamContainer(props) {
    const game = useContext(GameContext)[0];

    return (
        <div
            className="team-data"
            style={{
                backgroundColor: props.team === "greenTeam" ? "rgba(147, 179, 84, 0.8)" : "rgba(170, 209, 240, 0.8)",
            }}
        >
            <div>Members: {game.teams && game.teams.blueTeam.join(", ")}</div>

            <div>Score: {game.blueTeamScore && game.blueTeamScore}</div>
        </div>
    );
}
