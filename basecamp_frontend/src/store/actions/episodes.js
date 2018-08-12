import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {GET_EPISODES, GET_EPISODE, ADD_EPISODE, UPDATE_EPISODE, DELETE_EPISODE} from "../actionsTypes";

const handleSeasons = episodes => ({
    type: GET_EPISODES,
    episodes
});

const handleSeason = episode => ({
    type: GET_EPISODE,
    episode
});

const handleAddSeason = episode => ({
    type: ADD_EPISODE,
    episode
});

const handleUpdateSeason = episode => ({
    type: UPDATE_EPISODE,
    episode
});

const handleDeleteSeason = episode => ({
    type: DELETE_EPISODE,
    episode
});

export const getAllEpisodes = (relatedShow, seasonNumber) => {
    return dispatch => {
        return apiCall('get', `/api/shows/${relatedShow}/seasons/${seasonNumber}/episodes`)
            .then(res => dispatch(handleSeasons(res)))
            .catch(err => addError(err.message));
    }
};

export const getEpisode = (relatedShow, seasonNumber, episodeNumber) => {
    return dispatch => {
        return apiCall('get', `/api/shows/${relatedShow}/seasons/${seasonNumber}/episodes/${episodeNumber}`)
            .then(res => dispatch(handleSeason(res)))
            .catch(err => addError(err.message));
    }
};

export const addEpisode = (relatedShow, seasonNumber, episode) => {
    return dispatch => {
        return apiCall('post', `/api/shows/${relatedShow}/seasons/${seasonNumber}/episodes`, episode)
            .then(res => dispatch(handleAddSeason(res)))
            .catch(err => addError(err.message));
    }
};

export const updateEpisode = (relatedShow, seasonNumber, episodeNumber, episode) => {
    return dispatch => {
        return apiCall('put', `/api/shows/${relatedShow}/seasons/${seasonNumber}/episodes/${episodeNumber}`, episode)
            .then(res => dispatch(handleUpdateSeason(res)))
            .catch(err => addError(err.message));
    }
};

export const deleteEpisode = (relatedShow, seasonNumber, episodeNumber) => {
    return dispatch => {
        return apiCall('delete', `/api/shows/${relatedShow}/seasons/${seasonNumber}/episodes/${episodeNumber}`)
            .then(res => dispatch(handleDeleteSeason(res)))
            .catch(err => addError(err.message));
    }
};