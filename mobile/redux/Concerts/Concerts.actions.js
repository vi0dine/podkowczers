import {
    FETCH_CONCERT, FETCH_CONCERT_FAIL,
    FETCH_CONCERT_SUCCESS,
    FETCH_CONCERTS,
    FETCH_CONCERTS_FAIL,
    FETCH_CONCERTS_SUCCESS
} from "./Concerts.types";

export const fetchConcerts = () => {
    return {
        type: FETCH_CONCERTS
    }
};

export const fetchConcertsSuccess = (concerts) => {
    return {
        type: FETCH_CONCERTS_SUCCESS,
        concerts: concerts
    }
};

export const fetchConcertsFail = (error) => {
    return {
        type: FETCH_CONCERTS_FAIL,
        error: error
    }
};

export const fetchConcert = (id) => {
    return {
        type: FETCH_CONCERT,
        id: id
    }
};

export const fetchConcertSuccess = (concert) => {
    return {
        type: FETCH_CONCERT_SUCCESS,
        concert: concert
    }
};

export const fetchConcertFail = (error) => {
    return {
        type: FETCH_CONCERT_FAIL,
        error: error
    }
};