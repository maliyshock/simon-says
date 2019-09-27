import {CREATE_SEQUENCE, ADD_WORD, START_NEW_GAME } from '../constants'
import {generateSequence, addWord} from '../helpers/helpers';

const initialState = {
    song: []
};

export function sequenceReducer(state = initialState, action) {
    switch(action.type){
        case CREATE_SEQUENCE:
            return  {...state, song: generateSequence()};

        case ADD_WORD:
            const sequence = action.payload;

            return {...state, song: addWord(sequence)};

        default:
            return state;
    }
}
