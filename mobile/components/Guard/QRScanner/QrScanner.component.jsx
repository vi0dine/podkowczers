import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner";
import QrScannerStyles from "./QrScanner.styles";

const QrScanner = ({onScanned}) => {
    const [permissions, setPermissions] = useState(null);
    const [value, setValue] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setPermissions(status === 'granted');
        })();
    }, []);

    return (
        <View style={QrScannerStyles.container}>
            <BarCodeScanner
                onBarCodeScanned={({data}) => onScanned(data)}
                style={QrScannerStyles.scanner}
            />
        </View>
    );
};

export default QrScanner;