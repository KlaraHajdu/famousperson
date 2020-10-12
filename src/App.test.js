import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import StartGame from './components/gameMasterComponents/StartGame'
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";


test('renders learn react link', () => {
  const mockStore = configureStore()
  const store = mockStore({})
  const { getByText } = render(<Provider store={store}><App /></Provider>)
  const linkElement = getByText(/Play/);
  expect(linkElement).toBeInTheDocument();
});


test("shows the text for starting the game", () => {
  const mockStore = configureStore()
  const store = mockStore({})
  const { getByText } = render(<Provider store={store}><GamePhaseProvider><StartGame /></GamePhaseProvider></Provider>);  
  const linkElement = getByText(/Start a new game as a game master/);
  expect(linkElement).toBeInTheDocument(); 
  });
