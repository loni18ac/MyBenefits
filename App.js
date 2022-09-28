
//-------------------------------------- GK1
import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
//import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import Mainpage from './components/MainPage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxWs3e3TkA4XCyNLJoLRse7x-cnkT8co",
  authDomain: "app-inno.firebaseapp.com",
  projectId: "app-inno",
  storageBucket: "app-inno.appspot.com",
  messagingSenderId: "748177715527",
  appId: "1:748177715527:web:466f7950e4391d6f751c62"
};

export default function App() {

    //Her oprettes bruger state variblen
    const [user, setUser] = useState({ loggedIn: false });

    //Koden sikrer at kun én Firebase initieres under brug af appen.
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        }

    //onAuthstatechanged er en prædefineret metode, forsynet af firebase, som konstant observerer brugerens status (logget ind vs logget ud)
    //Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
        function onAuthStateChange(callback) {
            return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback({loggedIn: true, user: user});
            } else {
                callback({loggedIn: false}

                );
            }
        });
    }

  //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);



  
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.header}>
            Perky
          </Text>

    
            <LoginForm />

        

            <SignUpForm/>
          
        </View>

    )
  }
//hvis user er logget ind, returner main page, hvis ikke så 
  return user.loggedIn ? <Mainpage/> : <GuestPage/> ;


    
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#D7E5F0',
      salignItems: 'center',
      justifyContent: 'center',
  },
  paragraph:{
    
  },
  header: {
      fontSize: 50,
      fontFamily: "Cochin",
      fontWeight: "bold",
      textAlign: 'center',
      marginTop: 15
  }
});
//---------------------------------------------------------------------
/*import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUpForm from './components/SignUpForm';
//import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./components/ProfileScreen";
import { Card } from 'react-native-paper';
import firebase from "firebase/compat";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxWs3e3TkA4XCyNLJoLRse7x-cnkT8co",
  authDomain: "app-inno.firebaseapp.com",
  projectId: "app-inno",
  storageBucket: "app-inno.appspot.com",
  messagingSenderId: "748177715527",
  appId: "1:748177715527:web:466f7950e4391d6f751c62"
};

export default function App() {

//Her oprettes bruger state variblen
  const [user, setUser] = useState({ loggedIn: false });

  //Koden sikrer at kun én Firebase initieres under brug af appen.
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

//onAuthstatechanged er en prædefineret metode, forsynet af firebase, som konstant observerer brugerens status (logget ind vs logget ud)
//Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

  //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

//Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Opret eller Login med din firebase Email
          </Text>

          <Card style={{padding:20}}>
            <SignUpForm />
          </Card>

          <Card style={{padding:20}}>
            <LoginForm />
          </Card>

        </View>
    )
  }

  return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%',
    backgroundColor: 'transparent',
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

*/
/*
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from "./components/StackNavigator";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase/compat";

import FlatListComponent from "./components/FlatListComponent";
import ArrayListComponent from "./components/ArrayListComponent";
import FetchListComponent from "./components/FetchListComponent";

//Her oprettes en instans af tabnavigator.
const Tab = createBottomTabNavigator();

//Her oprettes de tre tekst referencer, der skal benyttes i vores screen komponenter
const homeScreenText = "Dette er HomeScreen!"
const settingsScreenText = "Dette er SettingsScreen!"

/*Oprettelse af root komponent
* Her oprettes først en Navigationscontainer-komponent, der står for at håndtere state-ændringer & deep linking
* Ydeligere info om denne komponent kan findes i følgende link: https://reactnavigation.org/docs/navigation-container/
*
* Dernæst kaldes Navigator, der styrer navigationen mellem de forskellige tabs.
* I Tab navigatoren kalder en funktion i screenOptions, der har til formål at bestemme den aktuelle rute.
* Pba. af ruten styles den pågældende tab ved at benytte de importerede ikoner og den fastsatte styling, som ,
*  er fastsat  i tabBaroptions.
*
* Afslutningsvis angives de screen komponenter, vi ønsker at fremvise for hver tab. Komponenterne har vi importeret fra vores
* componentsfolder. Hver komponent fremvises ved brug af en funktion, der returnerer de komponenter vi har defineret til vores tabNavigator
* Hver komponent indeholder en reference til den tekst, som skal præsenteres i komponenten. Dertil er der skabt en nested Stacknavigator, som placeres i vores "details" tab.
*
* */
/*
export default function App() {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <FlatListComponent/>
    <ArrayListComponent/>
    <FetchListComponent/>
    
      </View>
      
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Disse settings har det med at drille android telefoner
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
*/
/*
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxWs3e3TkA4XCyNLJoLRse7x-cnkT8co",
  authDomain: "app-inno.firebaseapp.com",
  projectId: "app-inno",
  storageBucket: "app-inno.appspot.com",
  messagingSenderId: "748177715527",
  appId: "1:748177715527:web:466f7950e4391d6f751c62"
};

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
        {
          display: "flex"
        },
          null
          ],
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return (
                  <Ionicons
                      name={'home-outline'}
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Settings') {
              return (
                  <Ionicons
                      name='md-settings-outline'
                      size={size}
                      color={color}
                  />
              );
            }
            else{
              return (
                  <Ionicons
                      name='md-list-outline'
                      size={size}
                      color={color}
                  />
              );
            }
          },
        })}
        >
          <Tab.Screen name="Settings" children={()=><SettingsScreen prop={settingsScreenText}/>} />
          <Tab.Screen name="Home" children={()=><HomeScreen prop={homeScreenText}/>} />
          <Tab.Screen name="Stack" component={StackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App
      */