import React, { useState, useContext, useEffect } from "react";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseHeader from "./PhaseHeader.jsx";
import TeamContainer from "./TeamContainer.jsx";
import { MiddleContainerInThreeColumns } from "../static/myStyle.jsx";

function PlayGame() {
    const [game, setGame] = useContext(GameContext);

    const [teamOnTurn, setTeamOnTurn] = useState("");

    const [playerOnTurn, setPlayerOnTurn] = useState("");

    const handlePlayerOnTurnResult = (snapshot) => {
        setPlayerOnTurn(snapshot.val());
    };

    const handleTeamOnTurnResult = (snapshot) => {
        setTeamOnTurn(snapshot.val());
    };

    useEffect(() => {
        appFirebase.databaseApi.readOn(`games/${game.gameId}/teamOnTurn`, handleTeamOnTurnResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/playerOnTurn`, handlePlayerOnTurnResult);
    }, []);

    return (
        <div>
            <Row>
                <Col xs={12} md={3}>
                    <TeamContainer team="blueTeam"/>
                </Col>
                <Col xs={12} md={6}>
                    <MiddleContainerInThreeColumns>
                        <PhaseHeader title="Guessing"/>
                        <div>Now the {teamOnTurn} team is guessing</div>
                        <div>It is {playerOnTurn}'s turn now</div>
                    </MiddleContainerInThreeColumns>
                </Col>
                <Col xs={12} md={3}>
                <TeamContainer team="greenTeam"/>
                </Col>
            </Row>
        </div>
    );
}

export default PlayGame;
