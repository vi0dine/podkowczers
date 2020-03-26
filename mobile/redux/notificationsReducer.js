import { StyleSheet } from 'react-native';
import { Toast } from 'native-base';
import {MUSTARD, PURPLE, RED, WHITE} from "../variables";
import {BOOK_TICKETS_FAIL, BOOK_TICKETS_SUCCESS, FETCH_EVENT_FAIL} from "./Events/Events.types";
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
        backgroundColor: MUSTARD
    },
    successText: {
        color: PURPLE
    },
    error: {
        backgroundColor: RED
    },
    errorText: {
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
                    style: notificationsStyle.success,
                    textStyle: notificationsStyle.successText,
                    type: 'success'
                });
            }, 1000);
            return null;
        case BOOK_TICKETS_FAIL:
            setTimeout(() => {
                Toast.show({
                    text: `${action.error.response.data.error}`,
                    position: 'top',
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
        default:
            return null;
    }
};