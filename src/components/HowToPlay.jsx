import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";

export default function HowToPlay() {
    const [howToPlayModalOpen, setHowToPlayModalOpen] = useContext(HowToPlayModalOpenContext);

    return (
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
                        <strong>The goal:</strong> Two teams compete with each other explaining and guessing famous
                        persons within their own teams.
                    </p>
                    <p>
                        <strong>Preparation: </strong>
                        First each player submits secretly a few names that the other players probably also know to the
                        game. Once 30 names are gathered, the competition begins.{" "}
                    </p>
                    <p>
                        <strong>Starting the first round: </strong>
                        The player on turn has 60 seconds to explain the names drawn one after the other to their
                        teammates. When they have guessed the person, the team scores a point and the player goes on
                        with explaining the next one. The teammates can guess as many times as they want, but the player
                        on turn cannot pass on the name, even if they do not know the person. After 60 seconds it is the
                        other team's turn. The two teams continue like this until all the names are explained in the
                        round.
                    </p>
                    <p>
                        <strong>Three rounds: </strong>
                        In the first round the players explain the persons in detail, without telling the name. In
                        the second round the players are only allowed to say a single word, which will help their
                        teammates to guess the person. In the third round the player on turn can only pantomime without
                        saying anything. After the three rounds the team with higher scores wins.
                    </p>
                    <p>
                        <strong>Variations: </strong>
                        It is upon agreement if only real life persons or also fictious characters can be guessed in the
                        game. For advanced level you can agree on a limited topic (e.g. only musicians) or concepts
                        instead of persons.
                    </p>
                    <p>
                        <strong>Playing the game on this site: </strong>
                        Start a new game as a game master and send the game ID to your friends to join. Submit names
                        online, form random teams and let the game begin! When it is your turn just hit the button once
                        you are ready and explain or pantomime the name appearing on your screen to your teammates. All
                        you need in addition is a <strong>videoconferencing app</strong> to hear and see your teammates.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
}
