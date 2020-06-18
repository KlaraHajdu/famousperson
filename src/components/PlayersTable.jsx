import React from "react";
import Table from "react-bootstrap/Table";

export default function PlayersTable(props) {
  return (
    <Table striped bordered hover variant={props.color || 'dark'}>
      <thead>
        <tr>
          <th>{props.title}</th>
        </tr>
      </thead>
      {props.content && (
        <tbody>
          {props.content.map((player, index) => (
            <tr key={index}>
              <td>{player}</td>
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
}
