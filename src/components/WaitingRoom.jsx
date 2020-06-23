import React, { useContext, useEffect } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { appFirebase } from "../database.js";
import WaitingRoomGameMasterPart from "./gameMasterComponents/WaitingRoomGameMasterPart";
import PlayersTable from "./PlayersTable";
import { gamePhases } from "../gamePhasesObject";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";

function WaitingRoom() {
    const [game, setGame] = useContext(GameContext);
    const setGamePhase = useContext(GamePhaseContext)[1];

    const handlePlayersResult = (snapshot) => {
        if (snapshot.val() && JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(game.players)) {
            setGame({ ...game, players: Object.keys(snapshot.val()) });
        }
    };

    const setTeamInfos = (snapshot) => {
        const teams = snapshot.val();
        const ownTeam = teams.greenTeam.includes(game.ownName) ? "greenTeam" : "blueTeam";
        setGame({ ...game, ownTeam, teams });
    };

    const actAfterNewPlayerAdded = (err) => {
        if (!!err) console.log(err);
        else console.log("New player added to team");
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
    const checkIfPlayerIsPartOfTeam = () => {
        appFirebase.databaseApi.readOnce(`games/${game.gameId}/teams`, (snapshot) => {
        return snapshot.val().greenTeam.includes(game.ownName) || snapshot.val().blueTeam.includes(game.ownName)
        });
    };

    const handleGamePhaseResult = (snapshot) => {
        const DBGamePhase = snapshot.val();
        console.log("from handlegamephaseresult DBgamephase" + DBGamePhase + " game.gamephase: " + game.gamePhase);
        if ((DBGamePhase === "addNames" && !checkIfPlayerIsPartOfTeam()) || DBGamePhase === "playGame") {
            appFirebase.databaseApi.readOnce(`games/${game.gameId}/teams`, addNewPlayerToTeams);
        }
        if (DBGamePhase === "playGame" && game.gamePhase !== "playGame") {
            appFirebase.databaseApi.readOn(`games/${game.gameId}/teams`, setTeamInfos);
        }
        if (DBGamePhase !== game.gamePhase) {
            setGame({ ...game, gamePhase: DBGamePhase });
            setGamePhase(gamePhases[DBGamePhase]);
        }
    };

    const actAfterAddNewPlayer = (err) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Player added successfully");
        }
    };

    const handleGameData = (snapshot) => {
        const DBGame = snapshot.val();
        setGame({
            gameMaster: DBGame.gameMaster,
            players: Object.keys(DBGame.players),
            gameId: game.gameId,
            ownName: game.ownName,
            gamePhase: DBGame.gamePhase,
        });
    };

    const handleReadGameDataError = (err) => {
        console.log(err);
        alert("Something went wrong :(");
    };

    useEffect(() => {
        appFirebase.databaseApi.create(`games/${game.gameId}/players/${game.ownName}`, true, actAfterAddNewPlayer);
        appFirebase.databaseApi.readOnce(`games/${game.gameId}`, handleGameData, handleReadGameDataError);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/players`, handlePlayersResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
    }, []);

    return (
        <React.Fragment>
            <Container>
                <Container className="fixer">
                    <div>
                        <h2>
                            Waiting room <Badge variant="secondary">{game.gameId}</Badge>
                        </h2>
                        <h5>Game master: {game.gameMaster}</h5>
                        <hr />
                    </div>
                    <div>
                        <h5>Joined players</h5>
                        <PlayersTable title={"Players"} content={game.players} />
                    </div>
                    {game.ownName === game.gameMaster && <WaitingRoomGameMasterPart />}
                </Container>
            </Container>
        </React.Fragment>
    );
}

export default WaitingRoom;
