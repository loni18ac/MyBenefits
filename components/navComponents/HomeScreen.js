import React from "react";
import {ScrollView, Image, StyleSheet, Text, View} from "react-native";
import { BENEFITS} from "../../const";
import Perkyhome from '../../assets/Perkyhome.png';


const HomeScreenComponent = () => {

    return(
        <View style={styles.container}>
            <Image source={Perkyhome} style={{ width: 325, height: 520 }} />
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