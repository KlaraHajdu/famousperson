import React, { useContext } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from 'react-redux';

export default function PhaseHeader(props) {
  //const game = useContext(GameContext)[0];
  const gameR = useSelector(state => state.gameReducer)

    return (
      <div>

            <h4>Hello {gameR.ownName}!</h4>
        <Row>
          <Col>
            <h6>
                Game Id:{" "}
                <Badge variant="secondary" style={{}}>
                    {gameR.gameId}
                </Badge>{" "}
            </h6>
          </Col>
          <Col>
            <h6>
              Game master: {gameR.gameMaster}{" "}
            </h6>
          </Col>
        </Row>
            <hr />
        <h3>{props.title}</h3>
        <h3>{props.more}</h3>
            <hr />
        </div>
    );
}
