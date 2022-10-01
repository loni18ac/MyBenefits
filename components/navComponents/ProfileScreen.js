import React from 'react';
import {View, Image, Text, Button, StyleSheet} from 'react-native';
//import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import Perkyprofile from '../../assets/Perkyprofile.png';




function ProfileScreen () {

    //Firebase-metoden, handleLogout, håndterer log ud af en bruger, der er logget ind. Asynkron funktion
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    //Hvis den aktive bruger ikke kan findes, fortæller vi det i et tekstkomponent
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    //I return() hentes billede af sketch til Profil-siden, 
    //og vi stiller en knap til rådighed, der kan logge brugeren ud
    return (
        <View style={styles.container} >
            <Image source={Perkyprofile} style={{ width: 350, height: 400 }} />

            
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );

}

//Lokal styling til brug i ProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ffffff',
        padding: 8,
    },
});

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default ProfileScreen