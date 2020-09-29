import React from "react";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CounterStyle, CountdownItemStyle } from "../static/myStyle";
import GuessWord from "./GuessWord";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { BlueTeamPlayerIndexContext } from "./contextProviders/BlueTeamPlayerProvider";
import { GreenTeamPlayerIndexContext } from "./contextProviders/GreenTeamPlayerProvider";
import { RoundContext } from "./contextProviders/RoundProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { gamePhases } from "../gamePhasesObject";
import SVGCircle from "./SVGCircle";
import { useSelector } from 'react-redux';

export default function PlayerOnTurn(props) {
    const [counter, setCounter] = useState(20);
    const [turnStarted, setTurnStarted] = useState(false);
    const [game] = useContext(GameContext);
    const [blueTeamPlayerIndex] = useContext(BlueTeamPlayerIndexContext);
    const [greenTeamPlayerIndex] = useContext(GreenTeamPlayerIndexContext);
    const [round] = useContext(RoundContext);
    const setGamePhase = useContext(GamePhaseContext)[1];
    const gameR = useSelector((state) => state.gameReducer);
    const roundR = useSelector(state => state.roundReducer);
    const greenTeam = useSelector(state => state.teamReducer.greenTeam);
    const blueTeam = useSelector(state => state.teamReducer.blueTeam);
    
    const updateDone = (err) => {
        if (!!err) console.log(err);
        else console.log("Update of team on turn /playerindex /gamePhase made successfully");
    };

    const endRound = () => {
        setTurnStarted(false);
        if (round === 3) {
            setGamePhase(gamePhases.endGame);
            let updatePhase = {};
            updatePhase["gamePhase"] = "endGame";
            appFirebase.databaseApi.update(`games/${gameR.gameId}`, { gamePhase: "endGame" }, updateDone);
        }
        let updateRound = {};
        updateRound["round"] = +round + 1;
        appFirebase.databaseApi.update(`games/${gameR.gameId}`, updateRound, updateDone);
        let nextTeam = roundR.teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        let updateO = {};
        updateO["teamOnTurn"] = nextTeam;
        appFirebase.databaseApi.update(`games/${gameR.gameId}`, updateO, updateDone);

        if (gameR.ownTeam === "greenTeam") {
            if (roundR.greenPlayerIndex === greenTeam.length - 1) {
                appFirebase.databaseApi.update(`games/${gameR.gameId}/`, { greenTeamTurnIndex: 0 }, updateDone);
            } else {
                appFirebase.databaseApi.update(
                    `games/${gameR.gameId}/`,
                    { greenTeamTurnIndex: +roundR.greenPlayerIndex + 1 },

                    updateDone
                );
            }
        } else {
            if (roundR.bluePlayerIndex === blueTeam.length - 1) {
                appFirebase.databaseApi.update(`games/${gameR.gameId}/`, { blueTeamTurnIndex: 0 }, updateDone);
            } else
                appFirebase.databaseApi.update(
                    `games/${gameR.gameId}/`,
                    { blueTeamTurnIndex: +roundR.bluePlayerIndex + 1 },
                    updateDone
                );
        }
    };

    const mapNumber = (number, in_min, in_max, out_min, out_max) => {
        return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };

    let counterRadius = mapNumber(counter, 60, 0, 0, 360);

    useEffect(() => {
        console.log(counter);
        let unmounted = false;
        if (!unmounted) {
            if (counter === 0) props.endTurn();
            counter > 0 && turnStarted && setTimeout(() => setCounter(counter - 1), 1000);
            counterRadius = mapNumber(counter, 60, 0, 0, 360);
        }
        return () => {
            unmounted = true;
        };
    }, [turnStarted, counter]);

    return (
        <div>
            <Row>
                <Col>
                    <h4>It is your turn!</h4>
                </Col>
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
            <Row className="justify-content-md-center">
                {20 >= counter && counter > 0 && turnStarted ? <GuessWord endRound={endRound} /> : ""}
            </Row>
            <Row className="justify-content-md-center">
                <div>
                    {counter && (
                        <div>
                            <CountdownItemStyle>
                                <SVGCircle radius={counterRadius} />
                                <CounterStyle>
                                    <h1>{counter}</h1>
                                </CounterStyle>
                            </CountdownItemStyle>
                        </div>
                    )}
                </div>
            </Row>
        </div>
    );
}
