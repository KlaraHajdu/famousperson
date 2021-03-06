import React from "react";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CounterStyle, CountdownItemStyle } from "../static/myStyle";
import GuessWord from "./GuessWord";
import { appFirebase } from "../database.js";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { gamePhases } from "../gamePhasesObject";
import SVGCircle from "./SVGCircle";
import { useSelector } from 'react-redux';

export default function PlayerOnTurn(props) {
    const mapNumber = (number, in_min, in_max, out_min, out_max) => {
        return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };
    const ROUND_LENGTH = 60;
    const [counter, setCounter] = useState(ROUND_LENGTH);
    const [turnStarted, setTurnStarted] = useState(false);
    const [counterRadius, setCounterRadius] = useState(mapNumber(counter, ROUND_LENGTH, 0, 0, 360));
    const setGamePhase = useContext(GamePhaseContext)[1];
    const game = useSelector((state) => state.gameReducer);
    const round = useSelector(state => state.roundReducer);
    const greenTeam = useSelector(state => state.teamReducer.greenTeam);
    const blueTeam = useSelector(state => state.teamReducer.blueTeam);
    
    const updateDone = (err) => {
        if (!!err) console.log(err);
        else console.log("Update of team on turn /playerindex /gamePhase made successfully");
    };

    const startTurn = () => {
        setTurnStarted(true);
        appFirebase.databaseApi.update(`games/${game.gameId}/`, { turnOngoing: 1 })
    }

    const endRound = () => {
        setTurnStarted(false);
        appFirebase.databaseApi.update(`games/${game.gameId}/`, { turnOngoing: 0 });
        if (round.round === 3) {
            setGamePhase(gamePhases.endGame);
            let updatePhase = {};
            updatePhase["gamePhase"] = "endGame";
            appFirebase.databaseApi.update(`games/${game.gameId}`, { gamePhase: "endGame" }, updateDone);
        }
        let updateRound = {};
        updateRound["round"] = round.round + 1;
        appFirebase.databaseApi.update(`games/${game.gameId}`, updateRound, updateDone);
        let nextTeam = round.teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        let updateO = {};
        updateO["teamOnTurn"] = nextTeam;
        appFirebase.databaseApi.update(`games/${game.gameId}`, updateO, updateDone);

        if (game.ownTeam === "greenTeam") {
            if (round.greenPlayerIndex === greenTeam.length - 1) {
                appFirebase.databaseApi.update(`games/${game.gameId}/`, { greenTeamTurnIndex: 0 }, updateDone);
            } else {
                appFirebase.databaseApi.update(
                    `games/${game.gameId}/`,
                    { greenTeamTurnIndex: +round.greenPlayerIndex + 1 },

                    updateDone
                );
            }
        } else {
            if (round.bluePlayerIndex === blueTeam.length - 1) {
                appFirebase.databaseApi.update(`games/${game.gameId}/`, { blueTeamTurnIndex: 0 }, updateDone);
            } else
                appFirebase.databaseApi.update(
                    `games/${game.gameId}/`,
                    { blueTeamTurnIndex: +round.bluePlayerIndex + 1 },
                    updateDone
                );
        }
    };



    useEffect(() => {
        let unmounted = false;
        let counterTimeout;
        if (!unmounted) {
            if (counter === 0) props.endTurn();
            if (counter > 0 && turnStarted) {

                counterTimeout = setTimeout(() => setCounter(counter - 1), 1000);
                setCounterRadius(mapNumber(counter, ROUND_LENGTH, 0, 0, 360));
            }
        }
        return () => {
            clearTimeout(counterTimeout);
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
                            <Button style={{ width: 140 }} onClick={startTurn}>
                                Start your turn
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {ROUND_LENGTH >= counter && counter > 0 && turnStarted ? <GuessWord endRound={endRound} /> : ""}
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
