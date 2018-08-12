import {GET_PRIORITY_SHOW, GET_SHOWS, GET_SHOW, ADD_SHOW, UPDATE_SHOW, DELETE_SHOW} from "../actionsTypes";

const DEFAULT_STATE = {
    shows: [],
    show: {},
    priorityShow: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_PRIORITY_SHOW:
            return {...state, priorityShow: action.priorityShow};
        case GET_SHOWS:
            return {...state, shows: action.shows};
        case GET_SHOW:
            return {...state, show: action.show};
        case ADD_SHOW:
            return {...state, shows: [...state.shows, action.show]};
        case UPDATE_SHOW:
            return {...state, show: action.show};
        case DELETE_SHOW:
            console.log(action);
            const shows = state.shows.filter(show => show._id !== action.show._id);
            return {...state, shows};
        default:
            return state;
    }
}