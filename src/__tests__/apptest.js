import React from "react";
import { render } from '@testing-library/react';
import App from "../app";
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';


const mockStore = configureStore();
const store = mockStore({});


it("renders without crashing", () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>)
  const linkElement = getByText(/Play/);
  expect(linkElement).toBeInTheDocument();
});