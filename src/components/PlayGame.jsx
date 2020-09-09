import React, { useState, useContext, useEffect } from "react";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { BlueTeamPlayerIndexContext } from "./contextProviders/BlueTeamPlayerProvider";
import { GreenTeamPlayerIndexContext } from "./contextProviders/GreenTeamPlayerProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseHeader from "./PhaseHeader.jsx";
import TeamContainer from "./TeamContainer.jsx";
import { MiddleContainerInThreeColumns } from "../static/myStyle.jsx";
import { useCallback } from "react";

function PlayGame() {
    const [game, setGame] = useContext(GameContext);
    const [blueTeamPlayerIndex, setBlueTeamPlayerIndex] = useContext(BlueTeamPlayerIndexContext);
    const [greenTeamPlayerIndex, setGreenTeamPlayerIndex] = useContext(GreenTeamPlayerIndexContext);

    const handleTeamOnTurnResult = useCallback((snapshot) => {
        setGame({ ...game, teamOnTurn: snapshot.val() });
    });

    const handleGreenPlayerOnTurnIndexResult = useCallback((snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        setGreenTeamPlayerIndex(playerOnTurnIndex);
    });

    const handleBluePlayerOnTurnIndexResult = useCallback((snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        setBlueTeamPlayerIndex(playerOnTurnIndex);
    });

    const createStartDataDB = useCallback(() => {
        appFirebase.databaseApi.create(`games/${game.gameId}/teamOnTurn`, "greenTeam");
        appFirebase.databaseApi.create(`games/${game.gameId}/greenTeamTurnIndex`, "0");
    });

    useEffect(() => {
        if (game.ownName === game.gameMaster) {
            createStartDataDB();
        }
        appFirebase.databaseApi.readOn(`games/${game.gameId}/teamOnTurn`, handleTeamOnTurnResult); //setGame
        appFirebase.databaseApi.readOn(`games/${game.gameId}/blueTeamTurnIndex`, handleBluePlayerOnTurnIndexResult); //setBluePlayer
        appFirebase.databaseApi.readOn(`games/${game.gameId}/greenTeamTurnIndex`, handleGreenPlayerOnTurnIndexResult); //setGreenplayer
    }, []); //ha save-re automatikusan formázza, akkor berakja a dependency arrayba az összes fenti függvényt és objektumot és folyton újrarenderelődik... 

    return (
        <div>
            <Row>
                <Col xs={12} md={3}>
                    <TeamContainer team="blueTeam" />
                </Col>
                <Col xs={12} md={6}>
                    <MiddleContainerInThreeColumns>
                        <PhaseHeader title="Explain in detail" />
                        <div>
                            The{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: game.teamOnTurn === "greenTeam" ? "green" : "blue",
                                }}
                            >
                                {" "}
                                {game.teamOnTurn == "greenTeam" ? "green" : "blue"} team{" "}
                            </span>{" "}
                            is guessing. It is{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {" "}
                                {game.teamOnTurn &&
                                    game.teams[game.teamOnTurn][
                                        game.teamOnTurn === "greenTeam" ? greenTeamPlayerIndex : blueTeamPlayerIndex
                                    ]}
                            </span>
                            's turn now.
                        </div>
                    </MiddleContainerInThreeColumns>
                </Col>
                <Col xs={12} md={3}>
                    <TeamContainer team="greenTeam" />
                </Col>
            </Row>
        </div>
    );
}

export default PlayGame;
