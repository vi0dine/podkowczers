import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Container, Content, Picker, Icon} from "native-base";
import GuardScreenStyles from './GuardScreen.styles';
import QrScanner from "../../components/Guard/QRScanner/QrScanner.component";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../redux/Events/Events.actions";

const GuardScreen = () => {
    const dispatch = useDispatch();

    const [scanning, setScanning] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [tickets, setTickets] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        dispatch(fetchEvents())
    }, []);

    const fetchHashes = async () => {
        const { data } = await axios.request({
            url: `/api/v1/events/${eventId}/hashes`,
            method: "GET"
        });
        setTickets(data.tickets.map(ticket => ticket.hash));
    };

    const verifyHash = (hash) => {
        if (tickets.includes(hash)) {
            console.log('VALID')
        } else {
            console.log('INVALID')
        }
    };

    const events = useSelector(state => state.EventsState.events);

    return (
        <Container style={GuardScreenStyles.mainContainer}>
            <Content contentContainerStyle={GuardScreenStyles.content}>
                <View style={GuardScreenStyles.headerContainer}>
                    <Text style={GuardScreenStyles.headerText}>Administracja</Text>
                </View>
                <TouchableOpacity
                    disabled={!tickets}
                    onPress={() => setScanning(!scanning)}
                    style={GuardScreenStyles.qrButton}
                >
                    <Text style={GuardScreenStyles.qrButtonText}>SKANUJ KODY</Text>
                </TouchableOpacity>
                {
                    !scanning && (
                        <>
                            <View style={GuardScreenStyles.eventPickerContainer}>
                                <Picker
                                    mode="dropdown"
                                    style={GuardScreenStyles.eventPicker}
                                    itemStyle={GuardScreenStyles.eventPickerItem}
                                    selectedValue={eventId}
                                    onValueChange={setEventId}
                                >
                                    {
                                        events.map(event => {
                                            return <Picker.Item label={`${event.concert} - ${event.place.name}`} value={event.id} />
                                        })
                                    }
                                </Picker>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    fetchHashes()
                                }}
                                style={GuardScreenStyles.fetchTicketsButton}
                            >
                                <Text style={GuardScreenStyles.fetchTicketsButtonText}>POBIERZ BILETY</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                {
                    scanning && (
                        <View style={GuardScreenStyles.qrContainer}>
                            <QrScanner
                                onScanned={(data) => verifyHash(data)}
                            />
                        </View>
                    )
                }
            </Content>
        </Container>
    );
};

export default GuardScreen;