import {combineReducers} from 'redux';
import {sequence} from './gamePlayGround';

import {MAX_CYCLE} from '../constants'
import { PLAY_SEQUENCE, GIVE_CONTROL, SUCCESS_CHOICE, GAME_OVER, RESET_CYCLES, DISABLE_CONTROL, INCREASE_CYCLES } from '../constants'
import {RED, GREEN, BLUE, ORANGE} from '../constants'


const initialWordsState = {
    ALFA: {
        color: RED,
        active: false
    },
    OMEGA: {
        color: ORANGE,
        active: false
    },
    BETHA: {
        color: BLUE,
        active: false
    },
    THETHA: {
        color: GREEN,
        active: false
    },
};

const initialGamePropsState = {
    words: initialWordsState,
    cycle: 0,
    maxGameCycle: MAX_CYCLE,
    buttonAvaliable: false,
    score: 0,
    gameOver: false,
    level: 1
};

function changeActiveWord(state, activeButton) {
    return {
            ...state, [activeButton]: {
                ...state[activeButton], active: true
        }
    };
}


let gameProps = function gameProps(state = initialGamePropsState, action) {

    switch(action.type){
        case PLAY_SEQUENCE:
            const { activeButton, nextCycle } = action.payload;
            const newState =  changeActiveWord(initialWordsState, activeButton);
            return { ...state, words: newState, cycle: nextCycle, buttonAvaliable: false };

        case GIVE_CONTROL:
            return {...state, buttonAvaliable: true, words: initialWordsState};

        case DISABLE_CONTROL:
            return {...state, buttonAvaliable: false};

        case RESET_CYCLES:
            return {...state, cycle: 0};

        case INCREASE_CYCLES:
            const maxGameCycle = action.payload;
            return {...state, maxGameCycle: maxGameCycle+1};

        case SUCCESS_CHOICE:
            const { score, cycle } = action.payload;
            return { ...state,  cycle, score };

        case GAME_OVER:
            const { gameOver } = action.payload;
            return { ...state, gameOver };

        default:
            return state;
    }
};


export default combineReducers( {sequence, gameProps} );
