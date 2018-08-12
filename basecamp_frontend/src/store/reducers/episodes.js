import {GET_EPISODES, GET_EPISODE, ADD_EPISODE, UPDATE_EPISODE, DELETE_EPISODE} from "../actionsTypes";

const DEFAULT_STATE = {
    episodes: [],
    episode: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_EPISODES:
            return {...state, episodes: action.episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)};
        case GET_EPISODE:
            return {...state, episode: action.episode};
        case ADD_EPISODE:
            return {...state, episodes: [...state.episodes, action.episode]};
        case UPDATE_EPISODE:
            return {...state, episode: action.episode};
        case DELETE_EPISODE:
            console.log(action);
            const episodes = state.episodes.filter(episode => episode._id !== action.episode._id);
            return {...state, episodes};
        default:
            return state;
    }
}