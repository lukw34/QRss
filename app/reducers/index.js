import {combineReducers} from 'redux';
import loader from './loader.reducer';
import me from './me.reducer';

export default combineReducers({
    loader,
    me
});