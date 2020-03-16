import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, RED, WHITE} from "../../variables";
import Constants from "expo-constants";

const LoginScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height*0.1
    },
    logo: {
        height: Dimensions.get('window').height*0.4,
        width: Dimensions.get('window').width
    },
    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchText: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16
    },
    loader: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: Constants.statusBarHeight + 20,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.7
    },
    loadingText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 16
    }
});

export default LoginScreenStyles;