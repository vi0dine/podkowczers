import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, PURPLE, RED, WHITE} from "../../../variables";

const LoginFormStyles = StyleSheet.create({
    formContainer: {
        padding: 25
    },
    input: {
        marginBottom: 10,
        backgroundColor: WHITE,
        borderRadius: 25,
        height: Dimensions.get('window').height * 0.07
    },
    inputText: {
        fontSize: 14,
        color: PURPLE
    },
    inputIcon: {
        color: RED,
        opacity: .4,
        fontSize: 18,
        marginLeft: 5
    },
    errorInput: {
        backgroundColor: `${RED}60`,
        borderRadius: 25,
        height: Dimensions.get('window').height * 0.07,
    },
    errorInputText: {
        fontSize: 14,
        color: WHITE
    },
    errorInputIcon: {
        color: WHITE,
        opacity: .4,
        fontSize: 18,
        marginLeft: 5
    },
    errorMessageContainer: {
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 15
    },
    errorMessageText: {
        color: WHITE,
        textShadowColor: RED,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10
    },
    submitButton: {
        backgroundColor: RED,
        borderRadius: 25,
        justifyContent: 'center'
    },
    submitButtonText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontWeight: 'bold'
    }
});

export default LoginFormStyles;