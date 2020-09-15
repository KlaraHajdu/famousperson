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
import { RoundContext } from "./contextProviders/RoundProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { gamePhases } from "../gamePhasesObject";

export default function PlayerOnTurn(props) {
    const [counter, setCounter] = useState(20);
    const [turnStarted, setTurnStarted] = useState(false);
    const [game] = useContext(GameContext);
    const [blueTeamPlayerIndex] = useContext(BlueTeamPlayerIndexContext);
    const [greenTeamPlayerIndex] = useContext(GreenTeamPlayerIndexContext);
    const [round] = useContext(RoundContext);
    const setGamePhase = useContext(GamePhaseContext)[1];
    
    const updateDone = (err) => {

        if (!!err) console.log(err)
        else console.log("Update of team on turn /playerindex /gamePhase made successfully");
    }

    const endRound = () => {
        setTurnStarted(false);
        console.log("round:")
        console.log(round);
        console.log(round === 3);
        if (round === 3) {
            setGamePhase(gamePhases.endGame);
            let updatePhase = {};
            updatePhase["gamePhase"] = "endGame";
            appFirebase.databaseApi.update(`games/${game.gameId}`,
                {gamePhase: "endGame"},
                updateDone);
        }
        let updateRound = {};
        updateRound["round"] = +round+1;
        appFirebase.databaseApi.update(`games/${game.gameId}`,
        updateRound,
        updateDone
    );
        let nextTeam = game.teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        let updateO = {};
        updateO["teamOnTurn"] = nextTeam;
        appFirebase.databaseApi.update(`games/${game.gameId}`,
            updateO,
            updateDone
        );

        if (game.ownTeam === "greenTeam") {
            appFirebase.databaseApi.update(
                `games/${game.gameId}/`,
                { greenTeamTurnIndex: +greenTeamPlayerIndex+ 1 },
                updateDone
            );
        } else
            appFirebase.databaseApi.update(
                `games/${game.gameId}/`,
                { blueTeamTurnIndex: + blueTeamPlayerIndex + 1 },
                updateDone
            );

        
    }

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {

            if (counter === 0) props.endTurn();
            counter > 0 && turnStarted && setTimeout(() => setCounter(counter - 1), 1000);
        }
        return () => {unmounted = true}
    }, [turnStarted, counter]);

    return (
        <div>
            <Row>
                <Col>It is your turn!</Col>
                <Col style={{ height: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    {turnStarted ? (
                        ""
                        ) : (
                            <Button style={{ width: 140 }} onClick={() => setTurnStarted(true)}>
                            Start your turn
                        </Button>
                    )}
                    </div>
                </Col>
            </Row>
            {((20 >= counter && counter > 0) && turnStarted) ? <GuessWord endRound={endRound} /> : ""}
            <div style={{ color: "orange", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>{counter > 0 ? counter : "Time is up!"}</h1>
            </div>
        </div>
    );
}
