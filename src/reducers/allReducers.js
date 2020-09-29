import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import roundReducer from './roundReducer';
import scoreReducer from './scoreReducer';
import teamReducer from './teamReducer';

const allReducers = combineReducers({
    gameReducer: gameReducer,
    roundReducer: roundReducer,
    scoreReducer: scoreReducer,
    teamReducer: teamReducer
})

export default allReducers;