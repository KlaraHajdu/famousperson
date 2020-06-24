import React, { useContext, useEffect } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import { appFirebase } from "../database.js";
import NameInputForm from "./NameInputForm";
import PhaseHeader from "./PhaseHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TeamContainer from "./TeamContainer";
import { MiddleContainerInThreeColumns } from "../static/myStyle";

function AddNames() {
  const NUMBER_OF_NAMES_TO_START_GAME = 10;
  const game = useContext(GameContext)[0];

  const actAfterSettingPlayGamePhase = (err) => {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Play game phase was set successfully");
    }
  };

  const setPlayGamePhaseInDB = () => {
    appFirebase.databaseApi.update(
      `games/${game.gameId}`,
      { gamePhase: "playGame" },
      actAfterSettingPlayGamePhase
    );
  };

  const handleNamesResult = (snapshot) => {
    if (snapshot.val()) {
      if (
        Object.keys(snapshot.val()).length === NUMBER_OF_NAMES_TO_START_GAME
      ) {
        setPlayGamePhaseInDB();
      }
    }
  };

  const followHowManyNamesAdded = () => {
    appFirebase.databaseApi.readOn(
      `games/${game.gameId}/names`,
      handleNamesResult
    );
  };

  useEffect(() => {
    if (game.ownName === game.gameMaster) followHowManyNamesAdded();
  }, []);

  return (
    <div>
      <Row>
        <Col xs={12} md={3}>
          <TeamContainer team='blueTeam' />
        </Col>
        <Col xs={12} md={6}>
          <MiddleContainerInThreeColumns>
            <PhaseHeader title='Add names to the game' />
            <NameInputForm nameNumber={NUMBER_OF_NAMES_TO_START_GAME} />
          </MiddleContainerInThreeColumns>
        </Col>
        <Col xs={12} md={3}>
          <TeamContainer team='greenTeam' />
        </Col>
      </Row>
    </div>
  );
}

export default AddNames;
