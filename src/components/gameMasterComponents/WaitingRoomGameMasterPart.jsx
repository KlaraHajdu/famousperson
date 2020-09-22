import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { GameContext } from "../contextProviders/GameProvider";
import { shuffle } from "../../util/randomUtil";
import { appFirebase } from "../../database.js";

export default function WaitingRoomGameMasterPart() {
  const game = useContext(GameContext)[0];

  const actAfterTeamsAdded = (err) => {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Teams added successfully");
    }
  };

  const actAfterSetGamePhase = (err) => {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Phase changed successfully");
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
    appFirebase.databaseApi.create(
      `games/${game.gameId}/gamePhase`,
      "addNames",
      actAfterSetGamePhase
    );
  };

  return (
    <React.Fragment>
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
