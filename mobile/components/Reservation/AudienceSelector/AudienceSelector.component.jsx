import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {View, Text} from "react-native";
import {Spinner} from "native-base";
import {useSelector} from "react-redux";
import SeatButton from "../SeatButton/SeatButton.component";
import AudienceSelectorStyles from "./AudienceSelector.styles";
import {MUSTARD} from "../../../variables";

const AudienceSelector = ({id, handleSelect, handleDeselect}) => {
    const processing = useSelector(state => state.EventsState.processing);
    const fetching = useSelector(state => state.EventsState.fetching);
    const event = useSelector(state => state.EventsState.events.find(event => event.id === id));
    const [groupedSeats, setGroupedSeats] = useState(null);

    const groupByRow = () => {
        return _.groupBy(event.tickets, 'row');
    };

    useEffect(() => {
        if (processing || fetching) {
            setGroupedSeats(null);
        } else {
            setGroupedSeats(groupByRow())
        }
    }, [processing, fetching]);

    return (groupedSeats && !processing) ? (
        <View style={AudienceSelectorStyles.audience}>
            <View style={AudienceSelectorStyles.sceneContainer}>
                <Text style={AudienceSelectorStyles.sceneText}>SCENA</Text>
            </View>
            {
                Object.keys(groupedSeats).map((k, i) => (
                    <View key={i} style={AudienceSelectorStyles.row}>
                        {
                            _.sortBy(groupedSeats[k], 'seat').map((seat, i) => {
                                if (i === 10) {
                                    return (
                                        <>
                                            <View style={AudienceSelectorStyles.divider}/>
                                            <SeatButton key={seat.seat} ticket={seat}
                                                        handleSelect={ticket => handleSelect(ticket)}
                                                        handleDeselect={ticket => handleDeselect(ticket)}/>
                                        </>
                                    )
                                } else {
                                    return <SeatButton key={seat.seat} ticket={seat}
                                                       handleSelect={ticket => handleSelect(ticket)}
                                                       handleDeselect={ticket => handleDeselect(ticket)}/>
                                }
                            })
                        }
                    </View>
                ))
            }
        </View>
    ) : (
        <View style={AudienceSelectorStyles.audience}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Spinner color={MUSTARD} />
                {
                    processing ?
                        <Text style={AudienceSelectorStyles.loadingText}>PRZETWARZANIE REZERWACJI</Text> :
                        <Text style={AudienceSelectorStyles.loadingText}>ŁADOWANIE UKŁADU SALI</Text>
                }
            </View>
        </View>
    );
};

export default AudienceSelector;