
import {MAX_CYCLE} from '../constants'
import { PLAY_SEQUENCE, GIVE_CONTROL, SUCCESS_CHOICE, GAME_OVER, RESET_CYCLES, DISABLE_CONTROL, INCREASE_CYCLES, INCREASE_LEVEL, START_GAME, START_SING  } from '../constants'
import {RED, GREEN, BLUE, ORANGE} from '../constants'
import Tone from 'tone';

import alfa_sound from '../samples/alfa.mp3';
import omega_sound from '../samples/omega.mp3';
import betha_sound from '../samples/betha.mp3';
import thetha_sound from '../samples/thetha.mp3';
import go_sound from '../samples/go.mp3';


const initialWordsState = {
    dictionary: [
        {
            ALFA: {
                color: {
                    name: 'blue',
                    value: BLUE
                },
                sound: new Tone.Player({"url": alfa_sound}).toMaster(),
                active: false
            }
        },
        {
            OMEGA: {
                color: {
                    name: 'orange',
                    value: ORANGE
                },
                sound: new Tone.Player({"url": omega_sound}).toMaster(),
                active: false
            },
        },
        {
            BETHA: {
                color: {
                    name: 'red',
                    value: RED
                },
                sound: new Tone.Player({"url": betha_sound}).toMaster(),
                active: false
            },
        },
        {
            THETHA: {
                color: {
                    name: 'green',
                    value: GREEN
                },
                sound: new Tone.Player({"url": thetha_sound}).toMaster(),
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
    startGame: false,
    sing: false,
    goSound: new Tone.Player({'url': go_sound, 'onload': ()=>{}}).toMaster(),
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
            return {...state, buttonAvaliable: true, words: initialWordsState, sing: false};

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

        case START_GAME:
            return {...state, startGame: true};

        case START_SING:
            return {...state, sing: true};

        case GAME_OVER:
            const { gameOver } = action.payload;
            return { ...state, gameOver };

        default:
            return state;
    }
};
