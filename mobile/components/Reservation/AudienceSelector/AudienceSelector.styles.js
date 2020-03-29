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
        flex: .1,
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
        justifyContent: 'center',
        width: Dimensions.get('window').width*0.98,
        height: Dimensions.get('window').height*0.7
    },
    seats: {
        flex: .9,
        justifyContent: 'flex-end'
    },
    row: {
        flex: 1,
        maxHeight: 55,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    divider: {
        flex: 1,
        marginRight: 10
    }
});

export default AudienceSelectorStyles;