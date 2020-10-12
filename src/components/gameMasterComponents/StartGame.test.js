import { Provider } from 'react-redux';
import React from "react";
import StartGame from "./StartGame";
import configureStore from 'redux-mock-store'
import { render, cleanup } from "../../__tests__/test-utils";

const mockStore = configureStore();
const store = mockStore({});

afterEach(cleanup)

it("shows the text for starting the game", () => {
    const { getByText } = render(<Provider store={store}>
                                        <StartGame />
                                    </Provider>);

const linkElement = getByText(/Start a new game as a game master/);
expect(linkElement).toBeInTheDocument();

});

