import React, { useState, useContext, useEffect } from "react";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { BlueTeamPlayerIndexContext } from "./contextProviders/BlueTeamPlayerProvider";
import { GreenTeamPlayerIndexContext } from "./contextProviders/GreenTeamPlayerProvider";
import { ScoreContext } from "./contextProviders/ScoreProvider";
import { RoundContext } from "./contextProviders/RoundProvider";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import PhaseHeader from "./PhaseHeader.jsx";
import TeamContainer from "./TeamContainer.jsx";
import PlayerOnTurn from "./PlayerOnTurn";
import { MiddleContainerInThreeColumns } from "../static/myStyle.jsx";
import { useCallback } from "react";

function PlayGame() {
    const [game, setGame] = useContext(GameContext);
    const [blueTeamPlayerIndex, setBlueTeamPlayerIndex] = useContext(BlueTeamPlayerIndexContext);
    const [greenTeamPlayerIndex, setGreenTeamPlayerIndex] = useContext(GreenTeamPlayerIndexContext);
    const [round, setRound] = useContext(RoundContext);
    const [score, setScore] = useContext(ScoreContext);

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

    const handleScoreResult = (snapshot) => {
        console.log(snapshot.val());
        setScore(snapshot.val());
        console.log(score);
    }

    const createStartDataDB = useCallback(() => {
        appFirebase.databaseApi.create(`games/${game.gameId}/teamOnTurn`, "greenTeam");
        appFirebase.databaseApi.create(`games/${game.gameId}/greenTeamTurnIndex`, "0");
        appFirebase.databaseApi.readOnce(`games/${game.gameId}/names`, (snapshot) =>
            appFirebase.databaseApi.create(`games/${game.gameId}/1round`, snapshot.val())
        );
        appFirebase.databaseApi.readOnce(`games/${game.gameId}/names`, (snapshot) =>
            appFirebase.databaseApi.create(`games/${game.gameId}/2round`, snapshot.val())
        );
        appFirebase.databaseApi.readOnce(`games/${game.gameId}/names`, (snapshot) =>
            appFirebase.databaseApi.create(`games/${game.gameId}/3round`, snapshot.val())
        );
        appFirebase.databaseApi.create(`games/${game.gameId}/scores/blueTeamScore`, "0");
        appFirebase.databaseApi.create(`games/${game.gameId}/scores/greenTeamScore`, "0");
    });

    useEffect(() => {
        if (game.ownName === game.gameMaster) {
            createStartDataDB();
        }
        appFirebase.databaseApi.readOn(`games/${game.gameId}/teamOnTurn`, handleTeamOnTurnResult); //setGame
        appFirebase.databaseApi.readOn(`games/${game.gameId}/blueTeamTurnIndex`, handleBluePlayerOnTurnIndexResult); //setBluePlayer
        appFirebase.databaseApi.readOn(`games/${game.gameId}/greenTeamTurnIndex`, handleGreenPlayerOnTurnIndexResult); //setGreenplayer
        appFirebase.databaseApi.readOn(`games/${game.gameId}/scores`, handleScoreResult); //setScores
    }, [
    ]); //ha save-re automatikusan formázza, akkor berakja a dependency arrayba az összes fenti függvényt és objektumot és folyton újrarenderelődik...

    return (
        <div>
            <Row>
                <Col xs={12} md={3}>
                    <TeamContainer team="blueTeam" />
                </Col>
                <Col xs={12} md={6}>
                    <MiddleContainerInThreeColumns>
                        <PhaseHeader
                            title=""
                            more={
                                round === 1
                                    ? "1st round: Explain in detail"
                                    : round === 2
                                    ? "2nd round: explain with one word"
                                    : "3rd round: pantomime"
                            }
                        />
                        <div>
                            The{" "}
                            <Badge variant={game.teamOnTurn === "greenTeam" ? "success" : "primary"}>
                                {" "}
                                {game.teamOnTurn === "greenTeam" ? "green" : "blue"} team{" "}
                            </Badge>{" "}
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

                        <div style={{ paddingTop: 20 }}>
                            {game.ownName ===
                                game.teams[game.teamOnTurn || "greenTeam"][
                                    game.teamOnTurn === "greenTeam"
                                        ? greenTeamPlayerIndex || 0
                                        : blueTeamPlayerIndex || 1
                                ] && <PlayerOnTurn />}
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
