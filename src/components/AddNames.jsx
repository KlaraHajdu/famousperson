import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { GameContext } from "./contextProviders/GameProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { appFirebase } from "../database.js";
import { gamePhases } from "../gamePhasesObject";
import NameInputForm from "./NameInputForm";

function AddNames() {
  const NUMBER_OF_NAMES_TO_START_GAME  = 10;
  const [game, setGame] = useContext(GameContext);
  const setGamePhase = useContext(GamePhaseContext)[1];

  const handleNamesResult = (snapshot) => {
    if (snapshot.val()) {
      if (Object.keys(snapshot.val()).length === NUMBER_OF_NAMES_TO_START_GAME) {
        setGamePhase(gamePhases.playGame);
      }
      console.log(
        "from follow how many names added: " + Object.keys(snapshot.val())
      );
    }
  };

  const followHowManyNamesAdded = () => {
    appFirebase.databaseApi.readOn(
        `games/${game.gameId}/names`,
        handleNamesResult
      );
  }

  const setOwnTeam = (snapshot) => {
      console.log(snapshot.val().greenTeam);
    const team = snapshot.val().greenTeam.includes(game.ownName)
      ? "greenTeam"
      : "blueTeam";
    setGame({ ...game, ownTeam: team });
  };

  const findOwnTeam = () => {
    appFirebase.databaseApi.readOnce(
      `games/${game.gameId}/teams`,
      setOwnTeam
    );
  };

  useEffect(() => {
    findOwnTeam();
    followHowManyNamesAdded();
  }, []);

  return (
    <Container>
      <Container className='fixer'>
       <NameInputForm nameNumber={NUMBER_OF_NAMES_TO_START_GAME} />
      </Container>
    </Container>
  );
}

export default AddNames;
