import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { GameContext } from "./contextProviders/GameProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { appFirebase } from "../database.js";
import { gamePhases } from "../gamePhasesObject";
import NameInputForm from "./NameInputForm";
import TeamList from "./TeamList";

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

  const setTeamInfos = (snapshot) => {
    const teams = snapshot.val();
    const ownTeam = teams.greenTeam.includes(game.ownName)
      ? "greenTeam"
      : "blueTeam";
    console.log(teams)
    setGame({ ...game, ownTeam, teams });
  };

  const getTeams = () => {
    appFirebase.databaseApi.readOnce(
      `games/${game.gameId}/teams`,
      setTeamInfos
    );
  };

  useEffect(() => {
    getTeams();
    followHowManyNamesAdded();
  }, []);

  return (
    <Container>
      <Container className='fixer'>
        <TeamList/>
        <hr/>
       <NameInputForm nameNumber={NUMBER_OF_NAMES_TO_START_GAME} />
      </Container>
    </Container>
  );
}

export default AddNames;
