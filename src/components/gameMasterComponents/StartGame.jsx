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

export default function StartGame() {
    return (
        <Styles>
            <Container>
                <h4>Start a new game as a game master</h4>
                <Form>
                    <Form.Group controlId="formGameMasterName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type="text" placeholder="Your name that will appear during the game" />
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        Start a new game
                    </Button>
                </Form>
            </Container>
        </Styles>
    );
}
