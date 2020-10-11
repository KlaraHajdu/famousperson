import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

test('renders learn react link', () => {
  const mockStore = configureStore()
  const store = mockStore({})
  const { getByText } = render(<Provider store={store}><App /></Provider>)
  const linkElement = getByText(/Play/);
  expect(linkElement).toBeInTheDocument();
});
