import { combineReducers } from 'redux';
import gameReducer from './gameReducer';

const allReducers = combineReducers({
    gameReducer: gameReducer
})

export default allReducers;