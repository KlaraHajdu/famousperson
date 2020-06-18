import React, { useContext, useEffect } from "react";
import { GameContext } from "./contextProviders/GameProvider";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { appFirebase } from "../database.js";
import WaitingRoomGameMasterPart from "./gameMasterComponents/WaitingRoomGameMasterPart";
import AddNames from "./AddNames";
import PlayGame from "./PlayGame";

function WaitingRoom() {
    const [game, setGame] = useContext(GameContext);

    const handlePlayersResult = (snapshot) => {
        if (snapshot.val() && JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(game.players)) {
            setGame({ ...game, players: Object.keys(snapshot.val()) });
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
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Players</th>
                                </tr>
                            </thead>
                            {game.players && (
                                <tbody>
                                    {game.players.map((player, index) => (
                                        <tr key={index}>
                                            <td>{player}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </Table>
                    </div>
                    {game.ownName === game.gameMaster && <WaitingRoomGameMasterPart />}
                </Container>
            </Container>
            <AddNames />
        </React.Fragment>
    );
}

export default WaitingRoom;
