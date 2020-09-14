import React from "react";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GuessWord from "./GuessWord";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { BlueTeamPlayerIndexContext } from "./contextProviders/BlueTeamPlayerProvider";
import { GreenTeamPlayerIndexContext } from "./contextProviders/GreenTeamPlayerProvider";

export default function PlayerOnTurn() {
    const [counter, setCounter] = useState(20);
    const [turnStarted, setTurnStarted] = useState(false);
    const [game] = useContext(GameContext);
    const [blueTeamPlayerIndex] = useContext(BlueTeamPlayerIndexContext);
    const [greenTeamPlayerIndex] = useContext(GreenTeamPlayerIndexContext);
    
    const updateDone = (err) => {

        if (!!err) console.log(err)
        else console.log("Update of team on turn /playerindex made successfully");
    }

    const endRound = () => {
        setTurnStarted(false);
        let nextTeam = game.teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        let updateO = {};
        updateO["teamOnTurn"] = nextTeam;
        appFirebase.databaseApi.update(`games/${game.gameId}`,
            updateO,
            updateDone
        );

        if (game.ownTeam === "greenTeam") {
            appFirebase.databaseApi.update(
                `games/${game.gameId}/greenTeamTurnIndex/`,
                { greenTeamScore: +greenTeamPlayerIndex+ 1 },
                updateDone
            );
        } else
            appFirebase.databaseApi.update(
                `games/${game.gameId}/scores/`,
                { blueTeamScore: + blueTeamPlayerIndex + 1 },
                updateDone
            );

        
    }

    useEffect(() => {
        counter > 0 && turnStarted && setTimeout(() => setCounter(counter - 1), 1000);
    }, [turnStarted, counter]);

    return (
        <div>
            <Row>
                <Col>It is your turn!</Col>
                <Col style={{ height: 60 }}>
                    {turnStarted ? (
                        ""
                    ) : (
                        <Button block onClick={() => setTurnStarted(true)}>
                            Start your turn
                        </Button>
                    )}
                </Col>
            </Row>
            {((20 >= counter && counter > 0) && turnStarted) ? <GuessWord endRound={endRound} /> : ""}
            <div style={{ color: "orange", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>{counter > 0 ? counter : "Time is up!"}</h1>
            </div>
        </div>
    );
}
