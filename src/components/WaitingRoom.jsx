import React, { useContext, useEffect } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import { appFirebase } from "../database.js";
import WaitingRoomGameMasterPart from "./gameMasterComponents/WaitingRoomGameMasterPart";
import PlayersTable from "./PlayersTable";
import { gamePhases } from "../gamePhasesObject";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import PhaseHeader from "./PhaseHeader";
import { useSelector, useDispatch } from 'react-redux';
import { joinOwnTeam} from  '../actions/index';


function WaitingRoom() {
    const [game, setGame] = useContext(GameContext);
    const setGamePhase = useContext(GamePhaseContext)[1];
    const gameR = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    const handlePlayersResult = (snapshot) => {
        if (snapshot.val() && JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(game.players)) {
            setGame({ ...game, players: Object.keys(snapshot.val()) });
            console.log("setGame: players set");
        }
    };

    const setTeamInfos = (snapshot) => {
        const teamsDB = snapshot.val(); 
        const ownTeam = teamsDB.greenTeam.includes(gameR.ownName) ? "greenTeam" : "blueTeam";
        dispatch(joinOwnTeam(ownTeam));
        setGame({
            ...game,
            ownTeam,
            teams : {
                ...game.teams,
                greenTeam: teamsDB.greenTeam,
                blueTeam: teamsDB.blueTeam}
        });
    };

    const actAfterNewPlayerAdded = (err) => {
        if (!!err) console.log(err);
        else console.log("New player added to team: " + gameR.ownName);
    };

    const addNewPlayerToTeams = (snapshot) => {
        let teamToGrow;
        teamToGrow = snapshot.val().greenTeam.length > snapshot.val().blueTeam.length ? "blueTeam" : "greenTeam";

        appFirebase.databaseApi.create(
            `games/${gameR.gameId}/teams/${teamToGrow}/${snapshot.val()[teamToGrow].length}`,
            gameR.ownName,
            actAfterNewPlayerAdded
        );
    };
    const checkIfPlayerIsPartOfTeam = async () => {
        let playerIsPart;
        try {
            let teamsSnapshot = await appFirebase.database().ref(`games/${gameR.gameId}/teams`).once("value");
            playerIsPart =
                teamsSnapshot.val().greenTeam.includes(gameR.ownName) ||
                teamsSnapshot.val().blueTeam.includes(gameR.ownName);
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
          appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/teams`, addNewPlayerToTeams);
          console.log("Player is checked and added");
        }
          //appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/teams`, setTeamInfos); //kell ez is???
          appFirebase.databaseApi.readOn(`games/${gameR.gameId}/teams`, setTeamInfos);
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
        appFirebase.databaseApi.create(`games/${gameR.gameId}/players/${gameR.ownName}`, true, actAfterAddNewPlayer);
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/players`, handlePlayersResult);
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/gamePhase`, handleGamePhaseResult);
    }, []);

    return (
        <div className="main-tile">
            <PhaseHeader title="Waiting room" />
            <div>
                <h5>Joined players</h5>
                <PlayersTable title={"Players"} content={game.players} />
            </div>
            {gameR.ownName === gameR.gameMaster && <WaitingRoomGameMasterPart />}
        </div>
    );
}

export default WaitingRoom;
