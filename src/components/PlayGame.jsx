import React, { useState, useContext, useEffect } from "react";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseHeader from "./PhaseHeader.jsx";
import TeamContainer from "./TeamContainer.jsx";

function PlayGame() {
    const [game, setGame] = useContext(GameContext);

    const handleTeamOnTurnResult = (snapshot) => {
        setGame({ ...game, teamOnTurn: snapshot.val() });
    };
    const handleGreenPlayerOnTurnIndexResult = (snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        if (game.teams) setGame({ ...game, playerOnTurn: game.teams.greenTeam[playerOnTurnIndex] });
    };

    const handleBluePlayerOnTurnIndexResult = (snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        if (game.teams) setGame({ ...game, playerOnTurn: game.teams.blueTeam[playerOnTurnIndex] });
    };

    useEffect(() => {
        if (game.ownName === game.gameMaster) {
            appFirebase.databaseApi.create(`games/${game.gameId}/teamOnTurn`, "greenTeam");
            appFirebase.databaseApi.create(`games/${game.gameId}/greenTeamTurnIndex`, "0");
        }
        appFirebase.databaseApi.readOn(`games/${game.gameId}/teamOnTurn`, handleTeamOnTurnResult);
        appFirebase.databaseApi.readOn(
            `games/${game.gameId}/greenTeamTurnIndex`,
            handleGreenPlayerOnTurnIndexResult
        );
        appFirebase.databaseApi.readOn(
            `games/${game.gameId}/blueTeamTurnIndex`,
            handleBluePlayerOnTurnIndexResult
        );
    }, []);

    return (
        <div>
            <Row>
                <Col xs={12} md={3}>
                    <TeamContainer team="blueTeam" />
                </Col>
                <Col xs={12} md={6}>
                    <div className="team-data">
                        <PhaseHeader title="Guessing" />
                        <div>Now the {game.teamOnTurn} team is guessing</div>
                        <div>It is {game.playerOnTurn}'s turn now</div>
                    </div>
                </Col>
                <Col xs={12} md={3}>
                    <TeamContainer team="greenTeam" />
                </Col>
            </Row>
        </div>
    );
}

export default PlayGame;
