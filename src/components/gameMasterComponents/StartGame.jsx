import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { dbRefobject } from "../../database.js";

const Styles = styled.div`
    .container {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 30, 30, 30, 30;
        margin: 100;
        border-radius: 3px;
    }
`;

export default function StartGame() {

    const [name, setName] = useState("");

    const saveName = (e) => {
        setName(e.target.value);
    }
    
    const generateId = () => {
        return Math.floor(Math.random() * 10000);
    };
        
    const createNewGame = () => {
        if (name !== "") {
            const randomId = generateId();
            dbRefobject.ref("games").push({
                gameMaster: name,
                gameId: randomId
              });
        }
    }

    return (
        <Styles>
            <Container>
                <h4>Start a new game as a game master</h4>
                <Form>
                    <Form.Group controlId="formGameMasterName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control onChange={saveName} type="text" placeholder="Your name that will appear during the game" />
                    </Form.Group>
                    <Button variant="warning" type="submit" onClick={createNewGame}>
                        Start a new game
                    </Button>
                </Form>
            </Container>
        </Styles>
    );
}
