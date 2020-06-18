import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { GameContext } from "../contextProviders/GameProvider";

export default function WaitingRoomGameMasterPart() {
  const game = useContext(GameContext)[0];

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
          <Button variant='warning'>Form teams</Button>
        </div>
      )}
    </React.Fragment>
  );
}
