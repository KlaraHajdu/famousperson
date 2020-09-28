import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useEffect, useContext } from "react";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { RoundContext } from "./contextProviders/RoundProvider";
import { ScoreContext } from "./contextProviders/ScoreProvider";
import { useSelector } from 'react-redux';


export default function GuessWord(props) {
    const [word, setWord] = useState();
    //const score = useContext(ScoreContext)[0];
    const game = useContext(GameContext)[0];
    const round = useContext(RoundContext)[0];
    const gameR = useSelector(state => state.gameReducer);
    const score = useSelector(state => state.scoreReducer);


    const selectRandomWord = (snapshot) => {
        
        if (snapshot.val() !== null) {
            let words = snapshot.val();
            let randomId = Math.floor(Math.random() * Object.keys(words).length);
            setWord(Object.keys(words)[randomId]);
        }
        else props.endRound();
    };
    const updateDone = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Score /names successfully updated in db");
        }
    };
    const scoreWordGuessed = () => {
        let updateO = {};
        updateO[word] = null;
        appFirebase.databaseApi.update(`games/${gameR.gameId}/${round}round`,
        updateO,
        updateDone
        );
        appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/scores/${gameR.ownTeam}Score`, (snapshot) => {
            if (gameR.ownTeam === "greenTeam") {
                appFirebase.databaseApi.update(
                    `games/${gameR.gameId}/scores/`,
                    { greenTeamScore: +snapshot.val() + 1 },
                    updateDone
                );
            } else
                appFirebase.databaseApi.update(
                    `games/${gameR.gameId}/scores/`,
                    { blueTeamScore: +snapshot.val() + 1 },
                    updateDone
                );
        });
    };

    useEffect(() => {
        appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/${round}round`, selectRandomWord);
        console.log("Guessword mounted")
    }, [ score]);


    return (
        <Row>
            <Col>
                <h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf:"center" }}>
                        <Badge style={{ height: 36 }}  variant="warning">{word}</Badge>
                        </div>
                </h2>
            </Col>
            <Col>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf:"center" }}>
                    <Button style={{ height: 36 }} onClick={scoreWordGuessed}>Guessed</Button>
                </div>
            </Col>
        </Row>
    );
}
