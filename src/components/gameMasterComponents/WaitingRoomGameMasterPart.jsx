import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { GameContext } from "../contextProviders/GameProvider";
import { shuffle } from "../../util/randomUtil";
import { appFirebase } from "../../database.js";
import { GamePhaseContext } from "../contextProviders/GamePhaseProvider";
import { gamePhases } from "../../gamePhasesObject";

export default function WaitingRoomGameMasterPart() {
  const game = useContext(GameContext)[0];
  const setGamePhase = useContext(GamePhaseContext)[1];

  const setNamesPhase = () => {
    setGamePhase(gamePhases.addNames);
  }

  const actAfterTeamsAdded = (err) => {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Teams added successfully");
      setNamesPhase();
    }
  };

  const formTeams = () => {
    const shuffledPlayers = shuffle(game.players);
    const middle = Math.ceil(game.players.length / 2);
    const blueTeam = shuffledPlayers.slice(0, middle);
    const greenTeam = shuffledPlayers.slice(middle);

    appFirebase.databaseApi.create(
      `games/${game.gameId}/teams`,
      { blueTeam, greenTeam },
      actAfterTeamsAdded
    );
  };

  return (
    <React.Fragment>
      <hr />
      <div>
        <h5>Team division</h5>
        <ToggleButtonGroup
          type='radio'
          name='team-generator-method'
          defaultValue={1}
        >
          <ToggleButton variant='secondary' value={1}>
            Generate random teams
          </ToggleButton>
          <ToggleButton variant='secondary' value={2}>
            Select team members
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <hr />
      {game.players && game.players.length > 3 && (
        <div>
          <Button onClick={formTeams} variant='warning'>
            Form teams
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
