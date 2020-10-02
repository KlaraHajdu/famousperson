import React, { useEffect } from "react";
import { appFirebase } from "../database.js";
import WaitingRoomGameMasterPart from "./gameMasterComponents/WaitingRoomGameMasterPart";
import PlayersTable from "./PlayersTable";
import PhaseHeader from "./PhaseHeader";
import { useSelector, useDispatch } from 'react-redux';
import { joinOwnTeam, updatePlayers } from '../actions/index';
import { setGreenTeam, setBlueTeam } from '../actions/teamActions';


function WaitingRoom() {

    const game = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    const handlePlayersResult = (snapshot) => {
        if (snapshot.val() && JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(game.players)) {
            let playersList = [];
            playersList.push(Object.keys(snapshot.val()));
            console.log(playersList);
            dispatch(updatePlayers(Object.keys(snapshot.val())))
            sessionStorage.setItem("players", playersList);
            console.log([sessionStorage.getItem("players")]);
        }
    };

    const setTeamInfos = (snapshot) => {
        const teamsDB = snapshot.val(); 
        const ownTeam = teamsDB.greenTeam.includes(game.ownName) ? "greenTeam" : "blueTeam";
        dispatch(joinOwnTeam(ownTeam));
        dispatch(setGreenTeam(snapshot.val().greenTeam));
        dispatch(setBlueTeam(snapshot.val().blueTeam));
        sessionStorage.setItem("ownTeam", ownTeam);
        sessionStorage.setItem("greenTeam", snapshot.val().greenTeam);
        sessionStorage.setItem("blueTeam", snapshot.val().blueTeam);

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
        appFirebase.databaseApi.readOn(`games/${game.gameId}/teams`, setTeamInfos);
        let playerIsInTeam = await checkIfPlayerIsPartOfTeam();
        if (!playerIsInTeam) {
          appFirebase.databaseApi.readOnce(`games/${game.gameId}/teams`, addNewPlayerToTeams);
          console.log("Player is checked and added");
        }
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
