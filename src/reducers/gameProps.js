import { HIGHLIGHT_BUTTON, GIVE_CONTROL, SUCCESS_CHOICE, GAME_OVER, RESET_CYCLES, DISABLE_CONTROL, INCREASE_LEVEL, START_SING, ASSETS_LOADED, ASSETS_LOADING, START_NEW_GAME } from '../constants'
import {RED, GREEN, BLUE, ORANGE} from '../constants'

import {generateSequence} from '../helpers/helpers';

const initialWordsState = {
    dictionary: [
        {
            ALFA: {
                color: {
                    name: 'blue',
                    value: BLUE,
                },
                keycode: 'w',
                active: false
            }
        },
        {
            OMEGA: {
                color: {
                    name: 'orange',
                    value: ORANGE
                },
                keycode: 'd',
                active: false
            },
        },
        {
            THETHA: {
                color: {
                    name: 'green',
                    value: GREEN
                },
                keycode: 'a',
                active: false
            }
        },
        {
            BETHA: {
                color: {
                    name: 'red',
                    value: RED
                },
                keycode: 's',
                active: false
            }
        }
    ]
};

const initialGamePropsState = {
    words: initialWordsState,
    positions: {
        ALFA: 0,
        OMEGA: 1,
        THETHA: 2,
        BETHA: 3,
    },
    sounds: [],
    isLoading: true,
    loadValue: 0,
    gameStarted: false,
    sing: false,
    cycle: 0,
    buttonAvaliable: false,
    score: 0,
    gameOver: false,
    level: 1
};


function changeActiveWord(dictionaryArray, position, activeButton) {
    let newArray = dictionaryArray.slice();

    const newWord = {
        ...newArray[position],[activeButton]:{
            ...dictionaryArray[position][activeButton], active: true
        }
    };

    newArray.splice(position, 1, newWord);

    return newArray;
}

export function gamePropsReducer(state = initialGamePropsState, action) {
    switch(action.type){
        case HIGHLIGHT_BUTTON:
            const { activeButton, nextCycle } = action.payload;
            const updatedDictionary =  changeActiveWord(initialGamePropsState.words.dictionary, state.positions[activeButton], activeButton);
            return { ...state, words: {dictionary:updatedDictionary}, cycle: nextCycle, buttonAvaliable: false };

        case GIVE_CONTROL:
            return {...state, buttonAvaliable: true, words: initialWordsState, sing: false};

        case DISABLE_CONTROL:
            return {...state, buttonAvaliable: false};

        case RESET_CYCLES:
            return {...state, cycle: 0};

        case INCREASE_LEVEL:
            const level = action.payload;
            return {...state, level: level+1};

        case SUCCESS_CHOICE:
            const { score, cycle } = action.payload;
            return { ...state,  cycle, score };

        case ASSETS_LOADED:
            return { ...state,  isLoading: false, gameStarted: true };

        case ASSETS_LOADING:
            const { percent } = action.payload;

            return { ...state,  loadValue: percent };

        case START_SING:
            return {...state, sing: true};

        case GAME_OVER:
            const { gameOver } = action.payload;
            return { ...state, gameOver };

        case START_NEW_GAME: {
            return  {
                ...state,
                gameStarted: true,
                gameOver: false,
                sing: true,
                level: 1,
                cycle: 0,
                score: 0,
                buttonAvaliable: false,
            }
        }

        default:
            return state;
    }
}
