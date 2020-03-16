import React, {useState} from 'react';
import ReservationScreenStyles from "./ReservationScreen.styles";
import {View, Text, TouchableOpacity} from 'react-native';
import {Container} from "native-base";
import SelectSeatForm from "../../components/Reservation/SelectSeatForm/SelectSeatForm.component";
import RandomSeatForm from "../../components/Reservation/RandomSeatForm/RandomSeatForm.component";

const ReservationScreen = ({route}) => {
    const id = route.params.id;
    const [mode, setMode] = useState(null);

    return (
        <Container style={ReservationScreenStyles.mainContainer}>
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
        </Container>
    );
};

export default ReservationScreen;