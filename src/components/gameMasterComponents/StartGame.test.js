import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
//import TestRenderer from 'react-test-renderer';
import { GamePhaseContext } from "../contextProviders/GamePhaseProvider";
import StartGame from "./StartGame";
import { gamePhases } from "../../gamePhasesObject";
//import ShallowRenderer from 'react-test-renderer/shallow';

// render is not a function
//with React DOM
let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

test("with ReactDOM", () => {
    act(() => {
        ReactDOM.render(
            <GamePhaseContext value={gamePhases.startGame}>
                <StartGame />
            </GamePhaseContext>,
            container
        );
    });
    expect(container.findByType("h4").children).toEqual("Start a new game as a game master");
});

// cannot refer specifically to the usecontext hook (of the many)
// // 1. Shallow renderer to inject a mock hook:
// let realUseContext;
// let useContextMock;

// // Setup mock
// beforeEach(() => {
// realUseContext = React.useContext;
// useContextMock = React.useContext = jest.fn(); });

// // Cleanup mock
// afterEach(() => {
//     React.useContext = realUseContext;
// });

// test("mock hook", () => {
//     useContextMock.mockReturnValue(gamePhases.startGame);
//     const element = new ShallowRenderer().render(<StartGame />);
//     expect(element.root.findByType("h4").children).toEqual("Start a new game as a game master");
// });

// non-shallow renderer with a context provider
// ha context nélkül futtatom, akkor hiányolja a contextet. Ha contexttel, akkor TypeError: render is not a function (create-re utatva)
// test('renders without crashing', () => {
//     const element = TestRenderer.create(
//        // <GamePhaseContext value={"startGame"}>
//             <StartGame />
//        // </GamePhaseContext>
//     )

//     expect(element.root.findByType("h4").children).toEqual("Start a new game as a game master");
// })
