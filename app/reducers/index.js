import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import loader from './loader.reducer';
import me from './me.reducer';

export default combineReducers({
    loader,
    me,
    form: formReducer
});