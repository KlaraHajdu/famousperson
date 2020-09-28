import React from "react";
import { useContext, useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
//import { GameContext } from "./contextProviders/GameProvider";
import { ScoreContext } from "./contextProviders/ScoreProvider";
import { ReactComponent as Balloon } from "../static/1524086080.svg";
import { useSelector } from 'react-redux';

export default function EndGame() {
    const score = useContext(ScoreContext)[0];
    //const game = useContext(GameContext)[0];
    const [winnerTeam, setWinnerTeam] = useState(false);
    const [balloonTop1, setBalloonTop1] = useState(410);
    const [balloonTop2, setBalloonTop2] = useState(390);
    const [balloonTop3, setBalloonTop3] = useState(410);
    const gameR = useSelector(state => state.gameReducer);

    useEffect(() => {
        score && score.blueTeamScore > score.greenTeamScore ? setWinnerTeam("blue team") : setWinnerTeam("green team");
    }, [score]);

    useEffect(() => {
        setTimeout(() => (balloonTop1 >= -280 ? balloonTop1 > 405? setBalloonTop1(balloonTop1 - 0.5) : setBalloonTop1(balloonTop1 - 1.5) : setBalloonTop1(410)), 10);
    }, [balloonTop1]);

    useEffect(() => {
        setTimeout(() => (balloonTop2 >= -280 ? balloonTop2 > 405? setBalloonTop2(balloonTop2 - 0.5) : setBalloonTop2(balloonTop2 - 2) : setBalloonTop2(410)), 10);
    }, [balloonTop2]);

    useEffect(() => {
        setTimeout(() => (balloonTop3 >= -280 ? balloonTop3 > 405? setBalloonTop3(balloonTop3 - 0.5) : setBalloonTop3(balloonTop3 - 1) : setBalloonTop3(410)), 10);
    }, [balloonTop3]);

    return (
        <div>
            <div className="main-tile" style={{zIndex:"0" }}>
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <h3>
                        {(gameR.ownTeam === "greenTeam" && winnerTeam === "green team") ||
                        (gameR.ownTeam === "blueTeam" && winnerTeam === "blue team")
                            ? "Congratulations!"
                            : ""}
                    </h3>
                </div>
            </div>
            {(gameR.ownTeam === "greenTeam" && winnerTeam === "green team") ||
                        (gameR.ownTeam === "blueTeam" && winnerTeam === "blue team")
                            ? <div> <Balloon
                            id="balloon1"
                            style={{
                                top: `${balloonTop1}`,
                                height: "300",
                                position: "absolute",
                                zIndex: "1",
                                left: "20%",
                                width: "120",
                            }}
                        />
                        <Balloon
                            id="balloon2"
                            style={{
                                top: `${balloonTop2}`,
                                height: "300",
                                position: "absolute",
                                zIndex: "1",
                                left: "47%",
                                width: "120",
                            }}
                        />
                        <Balloon
                            id="balloon3"
                            style={{
                                top: `${balloonTop3}`,
                                height: "300",
                                position: "absolute",
                                zIndex: "1",
                                left: "73%",
                                width: "120",
                            }}
                        /> </div>
                            : ""}<div>
               
            </div>
        </div>
    );
}
