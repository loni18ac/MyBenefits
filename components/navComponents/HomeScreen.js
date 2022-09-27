import React from "react";
import {ScrollView, Image, StyleSheet, Text, View} from "react-native";
import { BENEFITS} from "../../const";
import Perkyhome from '../../assets/Perkyhome.png';


const ArrayListComponent = () => {

    return(
        <View style={styles.container}>
            <Image source={Perkyhome} style={{ width: 315, height: 500 }} />
            {/* Title med styling*/ }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});



export default ArrayListComponent;