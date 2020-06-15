import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const Styles = styled.div`
    .container {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 30, 30, 30, 30;
        margin: 100;
        border-radius: 3px;
    }
`;

function JoinGame() {
    return (
        <Styles>
            <Container>
                <h4>Join a game</h4>
                <Form>
                    <Form.Group controlId="formPlayerName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type="text" placeholder="Your name that will appear during the game" />
                    </Form.Group>
                    <Form.Group controlId="formGameID">
                        <Form.Label>Game ID</Form.Label>
                        <Form.Control type="text" placeholder="The game ID you received from the game master" />
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        Join the game
                    </Button>
                </Form>
            </Container>
        </Styles>
    )
}

export default JoinGame
