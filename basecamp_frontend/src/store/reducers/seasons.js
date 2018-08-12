import {GET_SEASONS, GET_SEASON, ADD_SEASON, UPDATE_SEASON, DELETE_SEASON} from "../actionsTypes";

const DEFAULT_STATE = {
    seasons: [],
    season: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_SEASONS:
            return {...state, seasons: action.seasons.sort((a, b) => a.seasonNumber - b.seasonNumber)};
        case GET_SEASON:
            return {...state, season: action.season};
        case ADD_SEASON:
            return {...state, seasons: [...state.seasons, action.season]};
        case UPDATE_SEASON:
            return {...state, season: action.season};
        case DELETE_SEASON:
            const seasons = state.seasons.filter(season => season._id !== action.season._id);
            return {...state, seasons};
        default:
            return state;
    }
}