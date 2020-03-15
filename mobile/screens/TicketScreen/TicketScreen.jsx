import React, {useEffect} from 'react';
import TicketScreenStyles from "./TicketScreen.styles";
import {Text, View, Image, Dimensions} from 'react-native';
import {Container, Content, Icon} from "native-base";
import {useSelector} from "react-redux";

const TicketScreen = ({route}) => {
    const id = route.params.id;
    const ticket = useSelector(state => state.UserState.tickets.find(ticket => ticket.id === id));

    return (
        <Container style={TicketScreenStyles.mainContainer}>
            <Content contentContainerStyle={TicketScreenStyles.content}>
                <View style={TicketScreenStyles.qrCodeContainer}>
                    <Image style={TicketScreenStyles.qrCode} source={{uri: `data:image/png;base64,${ticket.code}`}} />
                </View>
                <View style={TicketScreenStyles.infoContainer}>
                    <View style={TicketScreenStyles.concertContainer}>
                        <View style={TicketScreenStyles.iconContainer}>
                            <Icon type={'FontAwesome5'} name={'theater-masks'} style={TicketScreenStyles.icon}/>
                        </View>
                        <Text style={TicketScreenStyles.concert}>{ticket.concert}</Text>
                    </View>
                    <View style={TicketScreenStyles.placeContainer}>
                        <View style={TicketScreenStyles.iconContainer}>
                            <Icon type={'FontAwesome5'} name={'search-location'} style={TicketScreenStyles.icon}/>
                        </View>
                        <Text style={TicketScreenStyles.place}>{ticket.place}</Text>
                    </View>
                    <View style={TicketScreenStyles.chairContainer}>
                        <Text style={TicketScreenStyles.seatLabel}>Sektor:</Text>
                        <Text style={TicketScreenStyles.sector}>{ticket.sector}</Text>
                        <Text style={TicketScreenStyles.seatLabel}>Rząd:</Text>
                        <Text style={TicketScreenStyles.row}>{ticket.row}</Text>
                        <Text style={TicketScreenStyles.seatLabel}>Miejsce:</Text>
                        <Text style={TicketScreenStyles.seat}>{ticket.seat}</Text>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

export default TicketScreen;