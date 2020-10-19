import React, { useEffect } from "react";
import { appFirebase } from "../database.js";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import PhaseHeader from "./PhaseHeader.jsx";
import TeamContainer from "./TeamContainer.jsx";
import PlayerOnTurn from "./PlayerOnTurn";
import { MiddleContainerInThreeColumns } from "../static/myStyle.jsx";
import { useCallback } from "react";
import PlayGameMasterPart from "./gameMasterComponents/PlayGameMasterPart.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { finishBluePlayer, finishGreenPlayer, endRound, finishTeam } from '../actions/roundActions';
import { increaseGreenScore, increaseBlueScore } from '../actions/scoreActions';




function PlayGame() {
    const greenTeam = useSelector(state => state.teamReducer.greenTeam);
    const blueTeam = useSelector(state => state.teamReducer.blueTeam);
    const game = useSelector(state => state.gameReducer);
    const round = useSelector(state => state.roundReducer);
    const dispatch = useDispatch();

    const handleTeamOnTurnResult = (snapshot) => {
        dispatch(finishTeam(snapshot.val()));
        sessionStorage.setItem("teamOnTurn", snapshot.val());
    };

    const handleGreenPlayerOnTurnIndexResult = (snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        dispatch(finishGreenPlayer(playerOnTurnIndex));
        sessionStorage.setItem("greenTeamPlayerIndex", playerOnTurnIndex);
    };

    const handleBluePlayerOnTurnIndexResult = (snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        dispatch(finishBluePlayer(playerOnTurnIndex));
        sessionStorage.setItem("blueTeamPlayerIndex", playerOnTurnIndex);
    };

    const handleBlueScoreResult = (snapshot) => {
        dispatch(increaseBlueScore(snapshot.val()))
        sessionStorage.setItem("blueTeamScore", snapshot.val());
    }

    const handleGreenScoreResult = (snapshot) => {
        dispatch(increaseGreenScore(snapshot.val()))
        sessionStorage.setItem("greenTeamScore", snapshot.val());
    }

    const handleRoundResult = (snapshot) => {
        dispatch(endRound(snapshot.val()))
        sessionStorage.setItem("round", snapshot.val())
    }

    const updateDone = (err) => {

        if (!!err) console.log(err)
        else console.log("Update of team on turn /playerindex made successfully");
    }

    const endTurn = () => {
        let nextTeam = round.teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        let updateO = {};
        updateO["teamOnTurn"] = nextTeam;
        appFirebase.databaseApi.update(`games/${game.gameId}`,
            updateO,
            updateDone
        );

        if (game.ownTeam === "greenTeam") {
            if (round.greenPlayerIndex === greenTeam.length-1) {
                appFirebase.databaseApi.update(
                    `games/${game.gameId}/`,
                    { greenTeamTurnIndex: 0 },
                    updateDone
                );
            }
            else {
            appFirebase.databaseApi.update(
                `games/${game.gameId}/`,
                { greenTeamTurnIndex: +round.greenPlayerIndex+ 1 },
                
                updateDone
            );
        }
        } else {
            if (round.bluePlayerIndex === blueTeam.length-1) {
                appFirebase.databaseApi.update(
                    `games/${game.gameId}/`,
                    { blueTeamTurnIndex: 0 },
                    updateDone
                    );
            }
            else
            appFirebase.databaseApi.update(
                `games/${game.gameId}/`,
                { blueTeamTurnIndex: + round.bluePlayerIndex + 1 },
                updateDone
                );
            }
    }

    
    useEffect(() => {
        const createStartDataDB = () => {
            appFirebase.databaseApi.create(`games/${game.gameId}/teamOnTurn`, "greenTeam");
            appFirebase.databaseApi.create(`games/${game.gameId}/greenTeamTurnIndex`, "0");
            appFirebase.databaseApi.create(`games/${game.gameId}/blueTeamTurnIndex`, "0");
            appFirebase.databaseApi.create(`games/${game.gameId}/round`, 1);
            appFirebase.databaseApi.readOnce(`games/${game.gameId}/names`, (snapshot) =>
                appFirebase.databaseApi.create(`games/${game.gameId}/1round`, snapshot.val())
            );
            appFirebase.databaseApi.readOnce(`games/${game.gameId}/names`, (snapshot) =>
                appFirebase.databaseApi.create(`games/${game.gameId}/2round`, snapshot.val())
            );
            appFirebase.databaseApi.readOnce(`games/${game.gameId}/names`, (snapshot) =>
                appFirebase.databaseApi.create(`games/${game.gameId}/3round`, snapshot.val())
            );
            appFirebase.databaseApi.create(`games/${game.gameId}/scores/blueTeamScore`, "0");
            appFirebase.databaseApi.create(`games/${game.gameId}/scores/greenTeamScore`, "0");
        };

        if (game.ownName === game.gameMaster) {
            createStartDataDB();
        }

        appFirebase.databaseApi.readOn(`games/${game.gameId}/teamOnTurn`, handleTeamOnTurnResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/greenTeamTurnIndex`, handleGreenPlayerOnTurnIndexResult); 
        appFirebase.databaseApi.readOn(`games/${game.gameId}/scores/blueTeamScore`, handleBlueScoreResult); 
        appFirebase.databaseApi.readOn(`games/${game.gameId}/scores/greenTeamScore`, handleGreenScoreResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/round`, handleRoundResult);
        appFirebase.databaseApi.readOn(`games/${game.gameId}/blueTeamTurnIndex`, handleBluePlayerOnTurnIndexResult);


    }, []); // []

    return (
            <Row style={{width:"100vw"}}>
                <Col xs={12} md={3}>
                    <TeamContainer team="blueTeam" />
                </Col>
                <Col xs={12} md={6}>
                    <MiddleContainerInThreeColumns>
                        <PhaseHeader
                            title=""
                            more={
                                round.round === 1
                                ? "1st round: Explain in detail"
                                    : round.round === 2
                                    ? "2nd round: explain with one word"
                                    : "3rd round: pantomime"
                            }
                            />
                        <div>
                            The{" "}
                            <Badge variant={round.teamOnTurn === "greenTeam" ? "success" : "primary"}>
                                {" "}
                                {round.teamOnTurn === "greenTeam" ? "green" : "blue"} team{" "}
                            </Badge>{" "}
                            is guessing. It is{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {" "}
                                {round.teamOnTurn &&
                                        round.teamOnTurn === "greenTeam" ? greenTeam[round.greenPlayerIndex] : blueTeam[round.bluePlayerIndex]
                                    }
                            </span>
                            's turn now.
                        </div>

                        <div style={{ paddingTop: 20 }}>
                            {game.ownName ===
                                (round.teamOnTurn === "greenTeam"
                                    ? greenTeam[round.greenPlayerIndex] 
                                    : blueTeam[round.bluePlayerIndex]) 
                                 && <PlayerOnTurn endTurn={ endTurn } />}
                    </div>
                    <div>
                        {game.ownName === game.gameMaster ? 
                        <PlayGameMasterPart/>: ""}
                    </div>
                    </MiddleContainerInThreeColumns>
                </Col>
                <Col xs={12} md={3}>
                    <TeamContainer team="greenTeam" />
                </Col>
            </Row>
    );
}

export default PlayGame;
