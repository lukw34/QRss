import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import loader from './loader.reducer';
import me from './me.reducer';
import messages from './messages.reducer';
import boards from './boards.reducer';


export default combineReducers({
    loader,
    me,
    boards,
    messages,
    form: formReducer
});