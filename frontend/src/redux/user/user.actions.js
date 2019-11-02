const SET_TOKEN = 'SET_TOKEN';
const SET_ROLE = 'SET_ROLE';
const AUTHENTICATE = 'AUTHENTICATE';

export const setUserToken = token => ({
    type: SET_TOKEN,
    payload: token
});

export const setUserRole = role => ({
    type: SET_ROLE,
    payload: role
});

export const authenticateUser = () => ({
    type: AUTHENTICATE,
    payload: null
});