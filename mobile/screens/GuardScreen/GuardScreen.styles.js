import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, PURPLE, RED, WHITE} from "../../variables";

const GuardScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        marginTop: Dimensions.get('window').height*0.05,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: Dimensions.get('window').height*.8,
    },
    headerContainer: {
        display: 'flex',
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingLeft: 10,
        height: Dimensions.get('window').height*.1
    },
    headerText: {
        fontFamily: MAIN_FONT,
        fontSize: 30,
        color: WHITE
    },
    qrContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    qrButton: {
        display: 'flex',
        flex: .3,
        width: Dimensions.get('window').width*.9,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MUSTARD,
        marginBottom: 20,
        marginTop: 30
    },
    qrButtonText: {
        fontFamily: MAIN_FONT,
        fontSize: 20,
        color: RED
    },
    eventPickerContainer: {
        display: 'flex',
        flex: .3,
        margin: 20,
        width: Dimensions.get('window').width*.9,
    },
    eventPicker: {
        backgroundColor: WHITE,
        color: PURPLE,
        fontFamily: MAIN_FONT
    },
    eventPickerItem: {
        color: PURPLE,
        fontFamily: MAIN_FONT
    },
    fetchTicketsButton: {
        width: Dimensions.get('window').width*.9,
        height: Dimensions.get('window').height*.1,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: RED
    },
    fetchTicketsButtonText: {
        fontFamily: MAIN_FONT,
        fontSize: 20,
        color: WHITE
    }
});

export default GuardScreenStyles;