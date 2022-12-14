import React from "react";
import {ScrollView, Image, StyleSheet, Text, View} from "react-native";
import Perkyhome from '../../assets/Perkyhome.png';

//Billede af Hjem-siden importeres og bruges i View-komponenten

const HomeScreenComponent = () => {

    return(
        <View style={styles.container}>
            <Image source={Perkyhome} style={{ width: 325, height: 570 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default HomeScreenComponent;