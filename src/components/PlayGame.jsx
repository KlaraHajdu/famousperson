import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <Container className="grid">
            <Row>
                <Col xs={12} md={3}>
                    <Container>
                        blue team container
                    </Container>
                </Col>
                <Col xs={12} md={6}>
                    <Container>
                       
                            <h4>Play the game</h4>
                            <div>Now the {teamOnTurn} team is guessing</div>
                            <div>It is {playerOnTurn}'s turn now</div>
                        
                    </Container>
                </Col>
                <Col xs={12} md={3}>
                    <Container>
                        green team container
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default PlayGame;
