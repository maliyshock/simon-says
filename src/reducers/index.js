import {combineReducers} from 'redux';
import {sequenceReducer} from './sequence';
import {gamePropsReducer} from './gameProps';

export default combineReducers( {sequence:sequenceReducer, gameProps:gamePropsReducer} );
