import React from 'react';
import ReactDOM from 'react-dom';
import StartGame from './StartGame';

test('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<StartGame></StartGame>, div);
})