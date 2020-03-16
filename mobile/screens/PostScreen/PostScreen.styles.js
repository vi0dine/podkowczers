import {StyleSheet, Dimensions} from "react-native";
import {BLACK, MAIN_FONT, MUSTARD, RED} from "../../variables";

const PostScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height*0.85,
        marginTop: Dimensions.get('window').height*0.05,
    },
    attachmentsContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.4,
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.3
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.4,
        resizeMode: 'contain'
    },
    bodyContainer: {
        padding: 10,
        width: Dimensions.get('window').width,
    },
    body: {
        fontFamily: MAIN_FONT,
        color: MUSTARD,
        fontSize: 16
    },
    dateContainer: {
        width: Dimensions.get('window').width,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    date: {
        fontFamily: MAIN_FONT,
        color: RED,
        fontSize: 14
    }
});

export default PostScreenStyles;