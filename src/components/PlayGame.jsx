import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseHeader from "./PhaseHeader.jsx";

function PlayGame() {
    //const [game, setGame] = useContext(GameContext);
    const [game, setGame] = useState({ gameMaster: "GameM" });

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
            <Row>
                <Col xs={12} md={3}>
                    <div className="team-data">
                        blue team container
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="team-data">
                        <PhaseHeader title="Guessing"/>
                        <div>Now the {teamOnTurn} team is guessing</div>
                        <div>It is {playerOnTurn}'s turn now</div>
                    </div>
                </Col>
                <Col xs={12} md={3}>
                    <div className="team-data">
                        green team container
                    </div>
                </Col>
            </Row>
    );
}

export default PlayGame;
