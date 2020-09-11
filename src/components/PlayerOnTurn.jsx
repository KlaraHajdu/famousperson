import React from "react";
import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GuessWord from "./GuessWord";

export default function PlayerOnTurn() {
    const [counter, setCounter] = useState(20);
    const [turnStarted, setTurnStarted] = useState(false);

    useEffect(() => {
        counter > 0 && turnStarted && setTimeout(() => setCounter(counter - 1), 1000);
    }, [turnStarted, counter]);

    return (
        <div>
            <Row>
                <Col>It is your turn</Col>
                <Col style={{ height: 60 }}>
                    {turnStarted ? (
                        ""
                    ) : (
                        <Button block onClick={() => setTurnStarted(true)}>
                            Start your turn
                        </Button>
                    )}
                </Col>
            </Row>
           {(20 > counter && counter > 0)?  <GuessWord/> : ""}
            <div style={{ color: "orange", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>{counter > 0 ? counter : "Time is up!"}</h1>
            </div>
        </div>
    );
}
