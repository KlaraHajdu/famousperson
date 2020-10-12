import { Provider } from 'react-redux';
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
//import TestRenderer from 'react-test-renderer';
import { GamePhaseContext } from "../contextProviders/GamePhaseProvider";
import StartGame from "./StartGame";
import { gamePhases } from "../../gamePhasesObject";
//import ShallowRenderer from 'react-test-renderer/shallow';
import { createStore } from 'redux';
import allReducers from '../../reducers/allReducers';
//import {  } from "@testing-library/react";
import { render, screen, cleanup } from "../../__tests__/test-utils";


// render is not a function
//with React DOM
let container;

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

afterEach(cleanup)


it("shows the text for starting the game", () => {
    const { findByType } = render(<Provider store={store}>
                                        <StartGame />
                                    </Provider>);

    const node = screen.findByType("h4");

    expect(node.children).toEqual("Start a new game as a game master");
});



// test("with ReactDOM", () => {
//     act(() => {
//         ReactDOM.render(
//             <Provider store={store}>
//             <GamePhaseContext value={gamePhases.startGame}>
//                 <StartGame />
//                 </GamePhaseContext>
//             </Provider>,
//             container
//         );
//     });
//     expect(container.findByType("h4").children).toEqual("Start a new game as a game master");
// });

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
