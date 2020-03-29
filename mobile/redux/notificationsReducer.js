import { StyleSheet } from 'react-native';
import { Toast } from 'native-base';
import {MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../variables";
import {BOOK_TICKETS_FAIL, BOOK_TICKETS_SUCCESS, FETCH_EVENT_FAIL, RETURN_TICKET_SUCCESS} from "./Events/Events.types";
import {
    AUTH_USER_FAIL,
    FETCH_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS
} from "./Users/Users.types";

const INITIAL_STATE = {
};

const notificationsStyle = StyleSheet.create({
    success: {
        backgroundColor: '#63A375',
        borderRadius: 10,
        shadowRadius: 3,
        shadowOffset: {x: 2, y: 2},
        elevation: 3,
        marginLeft: 5,
        marginRight: 5
    },
    successText: {
        fontFamily: MAIN_FONT,
        color: '#d9f0b4'
    },
    error: {
        backgroundColor: '#DB504A',
        borderRadius: 10,
        shadowRadius: 3,
        shadowOffset: {x: 2, y: 2},
        elevation: 3,
        marginLeft: 5,
        marginRight: 5
    },
    errorText: {
        fontFamily: MAIN_FONT,
        color: WHITE
    }
});

export const notificationsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER_FAIL:
            let errorCode = action.error.response.status;
            if (errorCode === 401 || errorCode === 400) {
                setTimeout(() => {
                    Toast.show({
                        text: 'Błędne dane logowania',
                        position: 'top',
                        style: notificationsStyle.error,
                        textStyle: notificationsStyle.errorText,
                        type: 'danger'
                    });
                }, 200);
            } else if (errorCode === 500) {
                setTimeout(() => {
                    Toast.show({
                        text: 'Serwer nie odpowiada. Spróbuj później...',
                        position: 'top',
                        style: notificationsStyle.error,
                        textStyle: notificationsStyle.errorText,
                        type: 'danger'
                    });
                }, 200);
            }

            return null;
        case REGISTER_USER_FAIL:
            if (action.error.response.status === 422) {
                setTimeout(() => {
                    Toast.show({
                        text: 'Użytkownik z tym mailem już istnieje.',
                        position: 'top',
                        style: notificationsStyle.error,
                        textStyle: notificationsStyle.errorText,
                        type: 'danger'
                    });
                }, 200);
            } else {
                setTimeout(() => {
                    Toast.show({
                        text: 'Coś poszło nie tak. Spróbuj później...',
                        position: 'top',
                        style: notificationsStyle.error,
                        textStyle: notificationsStyle.errorText,
                        type: 'danger'
                    });
                }, 200);
            }

            return null;
        case BOOK_TICKETS_SUCCESS:
            setTimeout(() => {
                Toast.show({
                    text: 'Zarezerwowano miejsca.',
                    position: 'top',
                    duration: 3000,
                    style: notificationsStyle.success,
                    textStyle: notificationsStyle.successText,
                    type: 'success'
                });
            }, 2000);
            return null;
        case BOOK_TICKETS_FAIL:
            setTimeout(() => {
                Toast.show({
                    text: action.error.response ? `${action.error.response.data.error}` : 'Coś poszło nie tak.',
                    position: 'top',
                    duration: 2000,
                    style: notificationsStyle.error,
                    textStyle: notificationsStyle.errorText,
                    type: 'danger'
                });
            }, 1000);
            return null;
        case FETCH_EVENT_FAIL:
            Toast.show({
                text: 'Coś poszło nie tak.',
                position: 'top',
                style: notificationsStyle.error,
                textStyle: notificationsStyle.errorText,
                type: 'danger'
            });
            return null;
        case FETCH_USER_FAIL:
            Toast.show({
                text: 'Coś poszło nie tak.',
                position: 'top',
                style: notificationsStyle.error,
                textStyle: notificationsStyle.errorText,
                type: 'danger'
            });
            return null;
        case REGISTER_USER_SUCCESS:
            Toast.show({
                text: 'Pomyślnie utworzono konto.',
                position: 'top',
                style: notificationsStyle.success,
                textStyle: notificationsStyle.successText,
                type: 'success'
            });
            return null;
        case LOGOUT_USER_SUCCESS:
            Toast.show({
                text: 'Pomyślnie wylogowano.',
                position: 'top',
                style: notificationsStyle.success,
                textStyle: notificationsStyle.successText,
                type: 'success'
            });
            return null;
        case RETURN_TICKET_SUCCESS:
            setTimeout(() => {
                Toast.show({
                    text: 'Zwróciłeś bilet.',
                    position: 'top',
                    duration: 2000,
                    style: notificationsStyle.success,
                    textStyle: notificationsStyle.successText,
                    type: 'success'
                });
            }, 500);
            return null;
        default:
            return null;
    }
};