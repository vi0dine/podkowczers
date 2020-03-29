import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../../variables";
import Constants from 'expo-constants';

const SelectSeatFormStyles = StyleSheet.create({
    content: {
        marginTop: Constants.statusBarHeight + 20,
        height: Dimensions.get('window').height*0.8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 80
    },
    audienceContainer: {
        padding: 5
    },
    hallButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MUSTARD,
        borderRadius: 30,
        height: Dimensions.get('window').height*0.4
    },
    hallButtonText: {
        color: WHITE,
        fontFamily: MAIN_FONT,
        fontSize: 32
    },
    dividedGallery: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dividedGalleryButton: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: RED,
        borderRadius: 20,
        margin: 10,
        height: Dimensions.get('window').height*0.2
    },
    galleryButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: RED,
        borderRadius: 20,
        margin: 10,
        height: Dimensions.get('window').height*0.2
    },
    galleryButtonText: {
        textAlign: 'center',
        color: WHITE,
        fontFamily: MAIN_FONT,
        fontSize: 32
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
    refreshIconContainer: {
        backgroundColor: `${WHITE}50`,
        width: 40,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    refreshIcon: {
        color: WHITE
    },
    backIconContainer: {
        backgroundColor: `${WHITE}50`,
        width: 40,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    backIcon: {
        color: WHITE,
        fontSize: 40
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
    },
    loadingText: {
        fontFamily: MAIN_FONT,
        color: WHITE,
        fontSize: 14
    }
});

export default SelectSeatFormStyles;