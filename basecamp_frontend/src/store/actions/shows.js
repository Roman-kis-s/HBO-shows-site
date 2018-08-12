import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {GET_PRIORITY_SHOW, GET_SHOWS, GET_SHOW, ADD_SHOW, UPDATE_SHOW, DELETE_SHOW} from "../actionsTypes";

const handleShows = shows => ({
    type: GET_SHOWS,
    shows
});

const handleShow = show => ({
    type: GET_SHOW,
    show
});

const handleAddShow = show => ({
    type: ADD_SHOW,
    show
});

const handleUpdateShow = show => ({
    type: UPDATE_SHOW,
    show
});

const handleDeleteShow = show => ({
    type: DELETE_SHOW,
    show
});

const handlePriorityShow = priorityShow => ({
    type: GET_PRIORITY_SHOW,
    priorityShow
});

export const getPriorityShow = () => {
    return dispatch => {
        return apiCall('get', '/api/')
            .then(res => {
                dispatch(handlePriorityShow(res))
            })
            .catch(err => addError(err.message));
    }
};

export const getAllShows = () => {
    return dispatch => {
        return apiCall('get', '/api/shows/')
            .then(res => dispatch(handleShows(res)))
            .catch(err => addError(err.message));
    }
};

export const getShow = (showTitle) => {
    return dispatch => {
        return apiCall('get', `/api/shows/${showTitle}`)
            .then(res => dispatch(handleShow(res)))
            .catch(err => addError(err.message));
    }
};

export const addShow = (show) => {
    return dispatch => {
        return apiCall('post', '/api/shows/', show)
            .then(res => dispatch(handleAddShow(res)))
            .catch(err => addError(err.message));
    }
};

export const updateShow = (showTitle, show) => {
    return dispatch => {
        return apiCall('put', `/api/shows/${showTitle}`, show)
            .then(res => dispatch(handleUpdateShow(res)))
            .catch(err => addError(err.message));
    }
};

export const deleteShow = (showTitle) => {
    return dispatch => {
        return apiCall('delete', `/api/shows/${showTitle}`)
            .then(res => dispatch(handleDeleteShow(res)))
            .catch(err => addError(err.message));
    }
};



