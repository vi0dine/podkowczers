import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";
import Constants from 'expo-constants';

const SelectSeatFormStyles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Constants.statusBarHeight + 20,
        marginBottom: 80
    },
    submitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        width: Dimensions.get('window').width,
    },
    submitOverview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    submitOverviewText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 24
    },
    submitButton: {
        marginRight: 15,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: RED
    },
    submitButtonText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 24
    }
});

export default SelectSeatFormStyles;