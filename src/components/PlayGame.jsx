import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";

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
        <Container>
            <Container className="fixer">
                <h4>Play the game</h4>
                <div>Now the {teamOnTurn} team is guessing</div>
                <div>It is {playerOnTurn}'s turn now</div>
            </Container>
        </Container>
    );
}

export default PlayGame;
