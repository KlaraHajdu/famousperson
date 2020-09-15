import React, { useContext, useEffect } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import { appFirebase } from "../database.js";
import WaitingRoomGameMasterPart from "./gameMasterComponents/WaitingRoomGameMasterPart";
import PlayersTable from "./PlayersTable";
import { gamePhases } from "../gamePhasesObject";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import PhaseHeader from "./PhaseHeader";

function WaitingRoom() {
    const [game, setGame] = useContext(GameContext);
    const setGamePhase = useContext(GamePhaseContext)[1];

    const handlePlayersResult = (snapshot) => {
        if (snapshot.val() && JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(game.players)) {
            setGame({ ...game, players: Object.keys(snapshot.val()) });
            console.log("setGame: players set");
        }
    };

    const setTeamInfos = (snapshot) => {
        const teams = snapshot.val(); 
        const ownTeam = teams.greenTeam.includes(game.ownName) ? "greenTeam" : "blueTeam";
        setGame({ ...game, ownTeam, teams });
    };

    const actAfterNewPlayerAdded = (err) => {
        if (!!err) console.log(err);
        else console.log("New player added to team: " + game.ownName);
    };

    const addNewPlayerToTeams = (snapshot) => {
        let teamToGrow;
        teamToGrow = snapshot.val().greenTeam.length > snapshot.val().blueTeam.length ? "blueTeam" : "greenTeam";

        appFirebase.databaseApi.create(
            `games/${game.gameId}/teams/${teamToGrow}/${snapshot.val()[teamToGrow].length}`,
            game.ownName,
            actAfterNewPlayerAdded
        );
    };
    const checkIfPlayerIsPartOfTeam = async () => {
        let playerIsPart;
        try {
            let teamsSnapshot = await appFirebase.database().ref(`games/${game.gameId}/teams`).once("value");
            playerIsPart =
                teamsSnapshot.val().greenTeam.includes(game.ownName) ||
                teamsSnapshot.val().blueTeam.includes(game.ownName);
        } catch (err) {
            console.log(err);
        }
        return playerIsPart;
    };

    const handleGamePhaseResult = async (snapshot) => {
        const DBGamePhase = snapshot.val();

      if (DBGamePhase === "addNames") {
        let playerIsInTeam = await checkIfPlayerIsPartOfTeam();
        if (!playerIsInTeam) {
          appFirebase.databaseApi.readOnce(`games/${game.gameId}/teams`, addNewPlayerToTeams);
          console.log("Player is checked and added");
        }
          appFirebase.databaseApi.readOnce(`games/${game.gameId}/teams`, setTeamInfos); //kell ez is???
          appFirebase.databaseApi.readOn(`games/${game.gameId}/teams`, setTeamInfos);
        }

        if (DBGamePhase !== game.gamePhase) {
            setGamePhase(gamePhases[DBGamePhase]);
        }
    };

    const actAfterAddNewPlayer = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Myself added successfully to game");
        }
    };


    useEffect(() => {
        appFirebase.databaseApi.create(`games/${game.gameId}/players/${game.ownName}`, true, actAfterAddNewPlayer);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/players`, handlePlayersResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
    }, []);

    return (
        <div className="main-tile">
            <PhaseHeader title="Waiting room" />
            <div>
                <h5>Joined players</h5>
                <PlayersTable title={"Players"} content={game.players} />
            </div>
            {game.ownName === game.gameMaster && <WaitingRoomGameMasterPart />}
        </div>
    );
}

export default WaitingRoom;
