import { StyleSheet } from 'react-native';
import { Toast } from 'native-base';
import {MUSTARD, PURPLE, WHITE} from "../variables";
import {BOOK_TICKETS_FAIL, BOOK_TICKETS_SUCCESS, FETCH_EVENT_FAIL} from "./Events/Events.types";
import {FETCH_USER_FAIL, REGISTER_USER_SUCCESS} from "./Users/Users.types";

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
        backgroundColor: PURPLE
    },
    errorText: {
        color: WHITE
    }
});

export const notificationsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
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
                    text: 'Coś poszło nie tak.',
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
        default:
            return null;
    }
};