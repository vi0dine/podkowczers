import React, {useState} from 'react';
import ReservationScreenStyles from "./ReservationScreen.styles";
import {View, Text, TouchableOpacity, RefreshControl} from 'react-native';
import {Container, Content} from "native-base";
import SelectSeatForm from "../../components/Reservation/SelectSeatForm/SelectSeatForm.component";
import RandomSeatForm from "../../components/Reservation/RandomSeatForm/RandomSeatForm.component";
import {fetchEvent} from "../../redux/Events/Events.actions";
import {useDispatch, useSelector} from "react-redux";

const ReservationScreen = ({route}) => {
    const id = route.params.id;
    const dispatch = useDispatch();
    const [mode, setMode] = useState(null);
    const event = useSelector(state => state.EventsState.events.find(event => event.id === id));
    const fetching = useSelector(state => state.EventsState.fetching);

    return (
        <Container style={ReservationScreenStyles.mainContainer}>
            <Content
                refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => dispatch(fetchEvent(id))}/>}
            >
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
                {mode === 'manual' && <SelectSeatForm id={id}/>}
            </Content>
        </Container>
    );
};

export default ReservationScreen;