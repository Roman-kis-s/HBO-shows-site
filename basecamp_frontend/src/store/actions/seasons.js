import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {GET_SEASONS, GET_SEASON, ADD_SEASON, UPDATE_SEASON, DELETE_SEASON} from "../actionsTypes";

const handleSeasons = seasons => ({
    type: GET_SEASONS,
    seasons
});

const handleSeason = season => ({
    type: GET_SEASON,
    season
});

const handleAddSeason = season => ({
    type: ADD_SEASON,
    season
});

const handleUpdateSeason = season => ({
    type: UPDATE_SEASON,
    season
});

const handleDeleteSeason = season => ({
    type: DELETE_SEASON,
    season
});

export const getAllSeasons = (showTitle) => {
    return dispatch => {
        return apiCall('get', `/api/shows/${showTitle}/seasons/`)
            .then(res => dispatch(handleSeasons(res)))
            .catch(err => addError(err.message));
    }
};

export const getSeason = (relatedShow, seasonNumber) => {
    return dispatch => {
        return apiCall('get', `/api/shows/${relatedShow}/seasons/${seasonNumber}`)
            .then(res => dispatch(handleSeason(res)))
            .catch(err => addError(err.message));
    }
};

export const addSeason = (relatedShow, season) => {
    return dispatch => {
        return apiCall('post', `/api/shows/${relatedShow}/seasons/`, season)
            .then(res => dispatch(handleAddSeason(res)))
            .catch(err => addError(err.message));
    }
};

export const updateSeason = (relatedShow, seasonNumber, season) => {
    return dispatch => {
        return apiCall('put', `/api/shows/${relatedShow}/seasons/${seasonNumber}`, season)
            .then(res => dispatch(handleUpdateSeason(res)))
            .catch(err => addError(err.message));
    }
};

export const deleteSeason = (relatedShow, seasonNumber) => {
    return dispatch => {
        return apiCall('delete', `/api/shows/${relatedShow}/seasons/${seasonNumber}`)
            .then(res => dispatch(handleDeleteSeason(res)))
            .catch(err => addError(err.message));
    }
};



