const INITIAL_STATE = {
    authenticated: false,
    token: null,
    role: null
};

const SET_TOKEN = 'SET_TOKEN';
const SET_ROLE = 'SET_ROLE';
const AUTHENTICATE = 'AUTHENTICATE';

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case SET_ROLE:
            return {
                ...state,
                role: action.payload
            };
        case AUTHENTICATE:
            return {
                ...state,
                authenticated: true
            };
        default:
            return state;
    }
};

export default userReducer;