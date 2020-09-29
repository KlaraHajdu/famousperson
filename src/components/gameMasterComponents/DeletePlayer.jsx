import React, { useRef, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styled from "styled-components";
import { appFirebase } from "../../database";
import Dialog from "react-bootstrap-dialog";
import { useSelector } from 'react-redux';


const Styles = styled.div`
    table {
        table-layout: auto;
        width: 15em;
    }
`;

export default function DeletePlayer(props) {
    
    const game = useSelector((state) => state.gameReducer);
    const greenTeam = useSelector(state => state.teamReducer.greenTeam);
    const blueTeam = useSelector(state => state.teamReducer.blueTeam);

    const [greenPlayersToList] = useState(greenTeam.filter((player) => {
        return player !== game.gameMaster;
    }));
    const [bluePlayersToList] = useState(blueTeam.filter((player) => {
        return player !== game.gameMaster;
    }));


    let dialog = useRef();

    Dialog.setOptions({
        defaultOkLabel: "Yes!",
        defaultCancelLabel: "Cancel",
        primaryClassName: "btn-warning",
    });

    const deleteDone = (err) => {
        if (!!err) console.log(err);
        else console.log("Player deleted");
    };

    const deleteBluePlayer = (player) => {
        let reducedTeam = blueTeam.filter((pl) => { return pl !== player.player })
        for (let p of reducedTeam) console.log(p);
        let updateO = {"blueTeam": reducedTeam}

        appFirebase.databaseApi.update(`games/${game.gameId}/teams/`, updateO, deleteDone);

        props.handleClosing();
    };

    const confirmBluePlayerDelete = (player) => {

        dialog.show({
            body: `Are you sure you want to delete ${player.player}?`,
            actions: [
                Dialog.CancelAction(() => {
                    props.handleClosing();
                }),
                Dialog.OKAction(() => {
                    deleteBluePlayer(player);
                }),
            ],
            bsSize: "small",
            onHide: (dialog) => {
                dialog.hide();
            },
        });
    };

    const deleteGreenPlayer = (player) => {
        let reducedTeam = greenTeam.filter((pl) => { return pl !== player.player })
        for (let p of reducedTeam) console.log(p);
        let updateO = {"greenTeam": reducedTeam}

        appFirebase.databaseApi.update(`games/${game.gameId}/teams/`, updateO, deleteDone);

        props.handleClosing();
    };

    const confirmGreenPlayerDelete = (player) => {

        dialog.show({
            body: `Are you sure you want to delete ${player.player}?`,
            actions: [
                Dialog.CancelAction(() => {
                    props.handleClosing();
                }),
                Dialog.OKAction(() => {
                    deleteGreenPlayer(player);
                }),
            ],
            bsSize: "small",
            onHide: (dialog) => {
                dialog.hide();
            },
        });
    };

    
    return (
        <Styles>
            <div>
                <Table striped bordered size="sm">
                    <colgroup>
                        <col></col>
                        <col style={{ width: "10%" }}></col>
                    </colgroup>
                    <tbody>
                        {greenPlayersToList.map((player, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {player}</td>
                                        <td style={{ width: "40" }}>
                                            <Button
                                                variant="danger"
                                                onClick={() => confirmGreenPlayerDelete({ player })}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {bluePlayersToList.map((player, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {player}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => confirmBluePlayerDelete({ player })}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
                <Button onClick={props.handleClosing} variant="info">Cancel</Button>
                <Dialog
                    ref={(component) => {
                        dialog = component;
                    }}
                />
            </div>
        </Styles>
    );
}
