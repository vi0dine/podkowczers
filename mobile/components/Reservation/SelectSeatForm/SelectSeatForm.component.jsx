import React, {useState, useEffect} from 'react';
import * as _ from 'lodash';
import {Icon, Spinner} from 'native-base';
import {useNavigation} from '@react-navigation/native'
import {View, Text, TouchableOpacity} from "react-native";
import SelectSeatFormStyles from "./SelectSeatForm.styles";
import AudienceSelector from "../AudienceSelector/AudienceSelector.component";
import {useDispatch, useSelector} from "react-redux";
import {bookTickets, fetchEvent} from "../../../redux/Events/Events.actions";
import AudienceSelectorStyles from "../AudienceSelector/AudienceSelector.styles";
import {MUSTARD} from "../../../variables";

const SelectSeatForm = ({id}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const event = useSelector(state => state.EventsState.events.find(event => event.id === id));
    const processing = useSelector(state => state.EventsState.processing);
    const fetching = useSelector(state => state.EventsState.fetching);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [sectors, setSectors] = useState({});
    const [visibleSector, setVisibleSector] = useState(null);

    const groupBySector = () => {
        const grouped = _.groupBy(event.tickets, 'sector');
        setSectors(grouped);
    };

    useEffect(() => {
        if (processing || fetching) {
            setSectors(null);
        } else if (event) {
            groupBySector()
        }
    }, [processing, fetching]);

    const onSelectSeat = (ticket) => {
        setSelectedTickets(selectedTickets.concat(ticket));
    };

    const onDeselectSeat = (ticket) => {
        setSelectedTickets(selectedTickets.filter(t => t.id !== ticket.id));
    };

    return (sectors && !processing) ? (
        <View style={SelectSeatFormStyles.content}>
            <View style={SelectSeatFormStyles.audienceContainer}>
                {
                    sectors && sectors["Sala"] && !visibleSector && (
                        <TouchableOpacity onPress={() => setVisibleSector('Sala')} style={SelectSeatFormStyles.hallButton}>
                            <Text style={SelectSeatFormStyles.hallButtonText}>PARTER</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    visibleSector === 'Sala' && (
                        <AudienceSelector
                            place={event.place.name}
                            tickets={sectors["Sala"]}
                            handleSelect={ticket => onSelectSeat(ticket)}
                            handleDeselect={ticket => onDeselectSeat(ticket)}
                        />
                    )
                }
                {
                    sectors && sectors["Balkon"] && !visibleSector && (
                        <TouchableOpacity onPress={() => setVisibleSector('Balkon')} style={SelectSeatFormStyles.galleryButton}>
                            <Text style={SelectSeatFormStyles.galleryButtonText}>BALKON</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    sectors && sectors["Lewy balkon"] && !visibleSector && (
                        <View style={SelectSeatFormStyles.dividedGallery}>
                            <TouchableOpacity onPress={() => setVisibleSector('Lewy balkon')} style={SelectSeatFormStyles.dividedGalleryButton}>
                                <Text style={SelectSeatFormStyles.galleryButtonText}>LEWY BALKON</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setVisibleSector('Prawy balkon')} style={SelectSeatFormStyles.dividedGalleryButton}>
                                <Text style={SelectSeatFormStyles.galleryButtonText}>PRAWY BALKON</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
                {
                    visibleSector === 'Balkon' && sectors["Balkon"] && (
                        <AudienceSelector
                            place={event.place.name}
                            tickets={sectors["Balkon"]}
                            handleSelect={ticket => onSelectSeat(ticket)}
                            handleDeselect={ticket => onDeselectSeat(ticket)}
                        />
                    )
                }
                {
                    visibleSector === 'Lewy balkon' && sectors["Lewy balkon"] && (
                        <AudienceSelector
                            place={event.place.name}
                            tickets={sectors["Lewy balkon"]}
                            handleSelect={ticket => onSelectSeat(ticket)}
                            handleDeselect={ticket => onDeselectSeat(ticket)}
                        />
                    )
                }
                {
                    visibleSector === 'Prawy balkon' && sectors["Prawy balkon"] && (
                        <AudienceSelector
                            place={event.place.name}
                            tickets={sectors["Prawy balkon"]}
                            handleSelect={ticket => onSelectSeat(ticket)}
                            handleDeselect={ticket => onDeselectSeat(ticket)}
                        />
                    )
                }
            </View>

            <View style={SelectSeatFormStyles.submitContainer}>
                <View style={SelectSeatFormStyles.submitOverview}>
                    <Text style={SelectSeatFormStyles.submitOverviewText}>Ilość: {selectedTickets.length}</Text>
                </View>
                {
                    visibleSector && (
                        <>
                            <TouchableOpacity
                                style={SelectSeatFormStyles.refreshIconContainer}
                                onPress={() => dispatch(fetchEvent(id))}
                            >
                                <Icon style={SelectSeatFormStyles.refreshIcon} name={'refresh'}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={SelectSeatFormStyles.backIconContainer}
                                onPress={() => setVisibleSector(null)}
                            >
                                <Icon style={SelectSeatFormStyles.backIcon} type={'MaterialIcons'} name={'chevron-left'}/>
                            </TouchableOpacity>
                        </>
                    )
                }
                <TouchableOpacity
                    style={SelectSeatFormStyles.submitButton}
                    onPress={() => {
                        dispatch(bookTickets(id, selectedTickets.map(ticket => ticket.id)));
                        setSelectedTickets([]);
                    }}
                >
                    <Text style={SelectSeatFormStyles.submitButtonText}>REZERWUJ</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        (
            <View style={SelectSeatFormStyles.content}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color={MUSTARD} />
                    {
                        processing ?
                            <Text style={SelectSeatFormStyles.loadingText}>PRZETWARZANIE REZERWACJI</Text> :
                            <Text style={SelectSeatFormStyles.loadingText}>ŁADOWANIE UKŁADU SALI</Text>
                    }
                </View>
            </View>
        )
    );
};

export default SelectSeatForm;