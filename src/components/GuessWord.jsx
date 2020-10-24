import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { appFirebase } from "../database.js";
import { useSelector } from "react-redux";

export default function GuessWord(props) {
    const [word, setWord] = useState();
    const [buttonActive, setButtonActive] = useState(true);
    const game = useSelector((state) => state.gameReducer);
    const score = useSelector((state) => state.scoreReducer);
    const round = useSelector((state) => state.roundReducer);

    const updateDone = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Score /names successfully updated in db");
        }
    };
    const scoreWordGuessed = () => {
        if (buttonActive) {
            setButtonActive(false);
            let updateO = {};
            updateO[word] = null;
            appFirebase.databaseApi.update(`games/${game.gameId}/${round.round}round`, updateO, updateDone);
            appFirebase.databaseApi.readOnce(`games/${game.gameId}/scores/${game.ownTeam}Score`, (snapshot) => {
                if (game.ownTeam === "greenTeam") {
                    appFirebase.databaseApi.update(
                        `games/${game.gameId}/scores/`,
                        { greenTeamScore: +snapshot.val() + 1 },
                        updateDone
                    );
                } else
                    appFirebase.databaseApi.update(
                        `games/${game.gameId}/scores/`,
                        { blueTeamScore: +snapshot.val() + 1 },
                        updateDone
                    );
            });
        }
    };

    useEffect(() => {
        let buttonEnableTimeout;
        if (!buttonActive) {
            buttonEnableTimeout = setTimeout(() => setButtonActive(true), 1500);
        }

        return () => {
            clearTimeout(buttonEnableTimeout);
        };
    }, [buttonActive]);

    useEffect(() => {
        const selectRandomWord = (snapshot) => {
            if (snapshot.val() !== null) {
                let words = snapshot.val();
                let randomId = Math.floor(Math.random() * Object.keys(words).length);
                setWord(Object.keys(words)[randomId]);
            } else props.endRound();
        };

        appFirebase.databaseApi.readOnce(`games/${game.gameId}/${round.round}round`, selectRandomWord);
        console.log("Guessword mounted");
    }, [score]); // score

    return (
        <Row>
            <Col>
                <h2>
                    <div
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                    >
                        <Badge style={{ height: 36 }} variant="warning">
                            {word}
                        </Badge>
                    </div>
                </h2>
            </Col>
            <Col>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                    <Button style={{ height: 36 }} onClick={scoreWordGuessed}>
                        Guessed
                    </Button>
                </div>
            </Col>
        </Row>
    );
}
