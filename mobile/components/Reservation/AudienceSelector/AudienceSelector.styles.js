import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";
import Constants from 'expo-constants';

const AudienceSelectorStyles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Constants.statusBarHeight + 20,
        marginBottom: 80
    },
    sceneContainer: {
        backgroundColor: RED,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sceneText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 21
    },
    audience: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: Constants.statusBarHeight + 20,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.7
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider: {
        flex: .2
    },
    loadingText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 14
    }
});

export default AudienceSelectorStyles;