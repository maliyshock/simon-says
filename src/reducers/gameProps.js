
import {MAX_CYCLE} from '../constants'
import { PLAY_SEQUENCE, GIVE_CONTROL, SUCCESS_CHOICE, GAME_OVER, RESET_CYCLES, DISABLE_CONTROL, INCREASE_CYCLES, INCREASE_LEVEL } from '../constants'
import {RED, GREEN, BLUE, ORANGE} from '../constants'


const initialWordsState = {
    dictionary: [
        {
            ALFA: {
                color: {
                    name: 'blue',
                    value: BLUE
                },
                active: false
            }
        },
        {
            OMEGA: {
                color: {
                    name: 'orange',
                    value: ORANGE
                },
                active: false
            },
        },
        {
            BETHA: {
                color: {
                    name: 'red',
                    value: RED
                },
                active: false
            },
        },
        {
            THETHA: {
                color: {
                    name: 'green',
                    value: GREEN
                },
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
        BETHA: 2,
        THETHA: 3,
    },
    cycle: 0,
    maxGameCycle: MAX_CYCLE,
    buttonAvaliable: false,
    score: 0,
    gameOver: false,
    level: 1
};

//fkng immutability!!! Bitch!
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
        case PLAY_SEQUENCE:
            const { activeButton, nextCycle } = action.payload;
            // console.log(state.positions[activeButton]);
            const updatedDictionary =  changeActiveWord(initialGamePropsState.words.dictionary, state.positions[activeButton], activeButton);
            return { ...state, words: {dictionary:updatedDictionary}, cycle: nextCycle, buttonAvaliable: false };

        case GIVE_CONTROL:
            return {...state, buttonAvaliable: true, words: initialWordsState};

        case DISABLE_CONTROL:
            return {...state, buttonAvaliable: false};

        case RESET_CYCLES:
            return {...state, cycle: 0};

        case INCREASE_LEVEL:
            const level = action.payload;
            return {...state, level: level+1};

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
