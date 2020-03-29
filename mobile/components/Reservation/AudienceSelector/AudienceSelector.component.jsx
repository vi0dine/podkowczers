import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {View, Text} from "react-native";
import {Spinner} from "native-base";
import {useSelector} from "react-redux";
import SeatButton from "../SeatButton/SeatButton.component";
import AudienceSelectorStyles from "./AudienceSelector.styles";
import {MUSTARD} from "../../../variables";

const AudienceSelector = ({place, tickets, handleSelect, handleDeselect}) => {
    const processing = useSelector(state => state.EventsState.processing);
    const fetching = useSelector(state => state.EventsState.fetching);
    const [groupedSeats, setGroupedSeats] = useState(null);


    const groupByRow = () => {
        console.log('Grouping by row');
        return _.groupBy(tickets, 'row');
    };

    useEffect(() => {
        if (processing || fetching) {
            setGroupedSeats(null);
        } else {
            setGroupedSeats(groupByRow())
        }
    }, [processing, fetching]);

    return (groupedSeats && !processing) && (
        <View style={AudienceSelectorStyles.audience}>
            <View style={AudienceSelectorStyles.sceneContainer}>
                <Text style={AudienceSelectorStyles.sceneText}>SCENA</Text>
            </View>
            <View style={AudienceSelectorStyles.seats}>
                {
                    Object.keys(groupedSeats).map((k, i) => (
                        <View key={i} style={ AudienceSelectorStyles.row }>
                            {
                                _.sortBy(groupedSeats[k], 'seat').map((seat, i) => {
                                    if (i === 10 && place.startsWith('II Liceum')) {
                                        return (
                                            <>
                                                <View style={AudienceSelectorStyles.divider}/>
                                                <SeatButton key={seat.seat} ticket={seat}
                                                            handleSelect={ticket => handleSelect(ticket)}
                                                            handleDeselect={ticket => handleDeselect(ticket)}/>
                                            </>
                                        )
                                    } else if (i === groupedSeats[k].length/2 && seat.sector !== 'Lewy balkon' && seat.sector !== 'Prawy balkon' && place.startsWith('Teatr Zdrojowy')) {
                                        return (
                                            <>
                                                <View style={AudienceSelectorStyles.divider}/>
                                                <SeatButton key={seat.seat} ticket={seat}
                                                            handleSelect={ticket => handleSelect(ticket)}
                                                            handleDeselect={ticket => handleDeselect(ticket)}/>
                                            </>
                                        )
                                    } else if (seat.sector === 'Balkon' && place.startsWith('Teatr Dramatyczny')) {
                                        return (
                                            <>
                                                <SeatButton key={seat.seat}
                                                            style={{minWidth: 8.5, margin: 1}}
                                                            ticket={seat}
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
        </View>
    )
};

export default AudienceSelector;