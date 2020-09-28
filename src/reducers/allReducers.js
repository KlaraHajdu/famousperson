import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import roundReducer from './roundReducer';
import scoreReducer from './scoreReducer';

const allReducers = combineReducers({
    gameReducer: gameReducer,
    roundReducer: roundReducer,
    scoreReducer: scoreReducer
})

export default allReducers;