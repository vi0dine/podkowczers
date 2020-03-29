import React, {useState} from 'react';
import ReservationScreenStyles from "./ReservationScreen.styles";
import {View, Text, TouchableOpacity, RefreshControl} from 'react-native';
import {Container, Content} from "native-base";
import SelectSeatForm from "../../components/Reservation/SelectSeatForm/SelectSeatForm.component";
import RandomSeatForm from "../../components/Reservation/RandomSeatForm/RandomSeatForm.component";
import {fetchEvent} from "../../redux/Events/Events.actions";
import {useDispatch, useSelector} from "react-redux";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const ReservationScreen = ({route}) => {
    const id = route.params.id;
    const dispatch = useDispatch();
    const [mode, setMode] = useState(null);

    return (
        <Container style={ReservationScreenStyles.mainContainer}>
            <Content>
                {
                    !mode && (
                        <View style={ReservationScreenStyles.content}>
                            {/*<TouchableOpacity*/}
                            {/*    onPress={() => setMode('random')}*/}
                            {/*    style={ReservationScreenStyles.buttonContainer}*/}
                            {/*>*/}
                            {/*    <Text style={ReservationScreenStyles.buttonText}>LOSOWE MIEJSCA</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity
                                onPress={() => setMode('manual')}
                                style={ReservationScreenStyles.buttonContainer}
                            >
                                <Text style={ReservationScreenStyles.buttonText}>WYBIERZ MIEJSCA</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {mode === 'random' && <RandomSeatForm id={id}/>}
                {mode === 'manual' && (
                    <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={1}
                        initialZoom={1}
                        bindToBorders={true}
                    >
                        <SelectSeatForm id={id}/>
                    </ReactNativeZoomableView>
                )}
            </Content>
        </Container>
    );
};

export default ReservationScreen;