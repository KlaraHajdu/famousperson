import React, { useContext } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";

//still  this styling does not work:
const Styles = styled.div`
    .modal-body {
        background: rgba(255, 255, 255, 0.3);
        color: red;
    }

    .modal-background-color {
        background: red;
    }
`;

export default function HowToPlay() {
    const [howToPlayModalOpen, setHowToPlayModalOpen] = useContext(HowToPlayModalOpenContext);

    return (
        <Styles>
            <Modal
                className="my-modal"
                size="lg"
                show={howToPlayModalOpen}
                onHide={() => setHowToPlayModalOpen(false)}
                aria-labelledby="how-to-play-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="how-to-play-modal">How to play the game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-background-color">
                        <p>
                            Two teams compete with each other to guess as many famous persons during the game as they
                            can.
                        </p>
                        <p>
                            First each player submits secretly a few names to the game that the other players probably
                            also know. Once 30 names are gathered, the competition begins. One player from the first
                            team has 60 seconds to explain the names drawn one after the other to their teammates. If
                            the teammates find out the person, the team scores a point and the player goes on with
                            explaining the next person. The teammates can guess as many times as they want. After 60
                            seconds it is the other team's turn. The two teams continue like this until all names are
                            explained (the players within the teams take turns in explaining after each 60-second slot).
                            In the second round the player is only allowed to say one word, which will help their
                            teammates to guess the person. In the third round the player on turn can only pantomime
                            without saying a word. After the three rounds the team with higher scores wins.
                        </p>
                        <p>
                            It is upon agreement if only real life persons or also fictious characters can be guessed in
                            the game. For advanced level you can agree on a limited topic (e.g. only artists) or
                            concepts instead of persons.{" "}
                        </p>
                        <p>
                            How to play this game on this site: start a new game as a game master and send the game ID
                            to your friends to join. Submit names online, form teams and let the game begin! All you
                            need in addition is a videoconferencing app to hear and see your teammates.
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </Styles>
    );
}
