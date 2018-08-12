import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import shows from './shows';
import seasons from './seasons';
import episodes from './episodes';


const rootReducer = combineReducers({
    currentUser,
    errors,
    shows,
    seasons,
    episodes
});

export default rootReducer;