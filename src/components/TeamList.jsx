import React, { useContext } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import PlayersTable from "./PlayersTable";

export default function TeamList() {
  const game = useContext(GameContext)[0];

  return (
    <div>
      <h5>Teams</h5>
      {game.teams && (
        <div className='team-tables-container'>
          {Object.keys(game.teams).map((team, index) => (
            <div className='team-table-container' key={index}>
              <PlayersTable
                color={team === "greenTeam" ? "success" : "primary"}
                title={team === "greenTeam" ? "Green" : "Blue"}
                content={game.teams[team]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
