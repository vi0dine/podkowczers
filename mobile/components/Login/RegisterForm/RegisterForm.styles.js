import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, RED, WHITE} from "../../../variables";

const RegisterFormStyles = StyleSheet.create({
    formContainer: {
        padding: 25
    },
    input: {
        marginBottom: 10,
        backgroundColor: WHITE,
        borderRadius: 25,
        height: Dimensions.get('window').height*0.07
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

export default RegisterFormStyles;