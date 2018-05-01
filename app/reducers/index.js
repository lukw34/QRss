import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import loader from './loader.reducer';
import me from './me.reducer';
import board from './board.reducer';

export default combineReducers({
    loader,
    me,
    board,
    form: formReducer
});