import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { GameContext } from "./contextProviders/GameProvider";
import { appFirebase } from "../database.js";
import NameInputForm from "./NameInputForm";
import TeamList from "./TeamList";
import PhaseHeader from "./PhaseHeader";

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
    <div className='main-tile'>
      <TeamList />
      <PhaseHeader title='Add names to the game' />
      <NameInputForm nameNumber={NUMBER_OF_NAMES_TO_START_GAME} />
    </div>
  );
}

export default AddNames;
