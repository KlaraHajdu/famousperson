import React, { useContext, useEffect } from "react";
import { appFirebase } from "../database.js";
import { GameContext } from "./contextProviders/GameProvider";
import { BlueTeamPlayerIndexContext } from "./contextProviders/BlueTeamPlayerProvider";
import { GreenTeamPlayerIndexContext } from "./contextProviders/GreenTeamPlayerProvider";
import { ScoreContext } from "./contextProviders/ScoreProvider";
import { RoundContext } from "./contextProviders/RoundProvider";
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
    const [game, setGame] = useContext(GameContext);
    const [blueTeamPlayerIndex, setBlueTeamPlayerIndex] = useContext(BlueTeamPlayerIndexContext);
    const [greenTeamPlayerIndex, setGreenTeamPlayerIndex] = useContext(GreenTeamPlayerIndexContext);
    const [round, setRound] = useContext(RoundContext);
    const setScore = useContext(ScoreContext)[1];
    const greenTeam = useSelector(state => state.teamReducer.greenTeam);
    const blueTeam = useSelector(state => state.teamReducer.blueTeam);

    const gameR = useSelector(state => state.gameReducer);
    const roundR = useSelector(state => state.roundReducer);
    const dispatch = useDispatch();

    const handleTeamOnTurnResult = useCallback((snapshot) => {
        dispatch(finishTeam(snapshot.val()));
        // setGame({
        //     ...game,
        //     teams:{...game.teams},
        //     teamOnTurn: snapshot.val()
        // });
    });

    const handleGreenPlayerOnTurnIndexResult = useCallback((snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        dispatch(finishGreenPlayer(playerOnTurnIndex));
        setGreenTeamPlayerIndex(playerOnTurnIndex);
    });

    const handleBluePlayerOnTurnIndexResult = useCallback((snapshot) => {
        let playerOnTurnIndex = snapshot.val();
        dispatch(finishBluePlayer(playerOnTurnIndex));
        setBlueTeamPlayerIndex(playerOnTurnIndex);
    });

    const handleBlueScoreResult = (snapshot) => {
        dispatch(increaseBlueScore(snapshot.val()))

    }

    const handleGreenScoreResult = (snapshot) => {
        dispatch(increaseGreenScore(snapshot.val()))

    }

    const handleRoundResult = (snapshot) => {
        console.log(snapshot.val());
        dispatch(endRound(snapshot.val()))
        setRound(snapshot.val());
    }

    const updateDone = (err) => {

        if (!!err) console.log(err)
        else console.log("Update of team on turn /playerindex made successfully");
    }

    const endTurn = () => {
        let nextTeam = roundR.teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        let updateO = {};
        updateO["teamOnTurn"] = nextTeam;
        appFirebase.databaseApi.update(`games/${gameR.gameId}`,
            updateO,
            updateDone
        );

        if (gameR.ownTeam === "greenTeam") {
            if (roundR.greenPlayerIndex === greenTeam.length-1) {
                appFirebase.databaseApi.update(
                    `games/${gameR.gameId}/`,
                    { greenTeamTurnIndex: 0 },
                    updateDone
                );
            }
            else {
            appFirebase.databaseApi.update(
                `games/${gameR.gameId}/`,
                { greenTeamTurnIndex: +roundR.greenPlayerIndex+ 1 },
                
                updateDone
            );
        }
        } else {
            if (roundR.bluePlayerIndex === blueTeam.length-1) {
                appFirebase.databaseApi.update(
                    `games/${gameR.gameId}/`,
                    { blueTeamTurnIndex: 0 },
                    updateDone
                    );
            }
            else
            appFirebase.databaseApi.update(
                `games/${gameR.gameId}/`,
                { blueTeamTurnIndex: + roundR.bluePlayerIndex + 1 },
                updateDone
                );
            }
    }

    const createStartDataDB = useCallback(() => {
        appFirebase.databaseApi.create(`games/${gameR.gameId}/teamOnTurn`, "greenTeam");
        appFirebase.databaseApi.create(`games/${gameR.gameId}/greenTeamTurnIndex`, "0");
        appFirebase.databaseApi.create(`games/${gameR.gameId}/blueTeamTurnIndex`, "0");
        appFirebase.databaseApi.create(`games/${gameR.gameId}/round`, 1);
        appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/names`, (snapshot) =>
            appFirebase.databaseApi.create(`games/${gameR.gameId}/1round`, snapshot.val())
        );
        appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/names`, (snapshot) =>
            appFirebase.databaseApi.create(`games/${gameR.gameId}/2round`, snapshot.val())
        );
        appFirebase.databaseApi.readOnce(`games/${gameR.gameId}/names`, (snapshot) =>
            appFirebase.databaseApi.create(`games/${gameR.gameId}/3round`, snapshot.val())
        );
        appFirebase.databaseApi.create(`games/${gameR.gameId}/scores/blueTeamScore`, "0");
        appFirebase.databaseApi.create(`games/${gameR.gameId}/scores/greenTeamScore`, "0");
    });

    useEffect(() => {
        if (gameR.ownName === gameR.gameMaster) {
            createStartDataDB();
        }

        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/teamOnTurn`, handleTeamOnTurnResult); //setGame
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/greenTeamTurnIndex`, handleGreenPlayerOnTurnIndexResult); //setGreenplayer
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/scores/blueTeamScore`, handleBlueScoreResult); //setScores
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/scores/greenTeamScore`, handleGreenScoreResult); //setScores
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/round`, handleRoundResult); //setRound
        appFirebase.databaseApi.readOn(`games/${gameR.gameId}/blueTeamTurnIndex`, handleBluePlayerOnTurnIndexResult); //setBluePlayer


    }, [
    ]); //ha save-re automatikusan formázza, akkor berakja a dependency arrayba az összes fenti függvényt és objektumot és folyton újrarenderelődik...



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
                                roundR.round === 1
                                ? "1st round: Explain in detail"
                                    : roundR.round === 2
                                    ? "2nd round: explain with one word"
                                    : "3rd round: pantomime"
                            }
                            />
                        <div>
                            The{" "}
                            <Badge variant={roundR.teamOnTurn === "greenTeam" ? "success" : "primary"}>
                                {" "}
                                {roundR.teamOnTurn === "greenTeam" ? "green" : "blue"} team{" "}
                            </Badge>{" "}
                            is guessing. It is{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {" "}
                                {roundR.teamOnTurn &&
                                        roundR.teamOnTurn === "greenTeam" ? greenTeam[roundR.greenPlayerIndex] : blueTeam[roundR.bluePlayerIndex]
                                    }
                            </span>
                            's turn now.
                        </div>

                        <div style={{ paddingTop: 20 }}>
                            {gameR.ownName ===
                                (roundR.teamOnTurn === "greenTeam"
                                    ? greenTeam[roundR.greenPlayerIndex] 
                                    : blueTeam[roundR.bluePlayerIndex]) 
                                 && <PlayerOnTurn endTurn={ endTurn } />}
                    </div>
                    <div>
                        {gameR.ownName === gameR.gameMaster ? 
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
