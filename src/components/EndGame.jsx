import React from "react";
import { useContext, useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { GameContext } from "./contextProviders/GameProvider";
import { ScoreContext } from "./contextProviders/ScoreProvider";

export default function EndGame() {
    const score = useContext(ScoreContext)[0];
    const game = useContext(GameContext)[0];
    const [winnerTeam, setWinnerTeam] = useState(false);

    useEffect(() => {
        score && score.blueTeamScore > score.greenTeamScore ? setWinnerTeam("blue team") : setWinnerTeam("green team");
    }, []);

    return (
        <div className="main-tile">
            <h4 style={{ alignSelf: "center", textAlign: "center", flex: 1 }}>
                The {""}
                <Badge
                    variant={score && score.blueTeamScore > score.greenTeamScore ? "primary" : "success"}
                    style={{ topPadding: 20, alignSelf: "center", textAlign: "center", flex: 1 }}
                >
                    {winnerTeam}
                </Badge>
                {""} has won!
            </h4>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h3>
                    {(game.ownTeam === "greenTeam" && winnerTeam === "green team") ||
                    (game.ownTeam === "blueTeam" && winnerTeam === "blue team")
                        ? "Congratulations!"
                        : ""}
                </h3>
            </div>
        </div>
    );
}
