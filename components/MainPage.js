import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeScreen from './navComponents/HomeScreen';
import SettingsScreenComponent from './navComponents/SettingsScreen';
import ProfileScreen from './ProfileScreen'
//import MapComponent from './stackComponents/MapComponent'

import {findFocusedRoute, NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons';




const MainPage = () => {
    const Tab = createBottomTabNavigator();
    //Her oprettes bruger state variblen

    const [user, setUser] = useState({ loggedIn: false });

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

    return (
      <View style={styles.container}>
        
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [{
              display: "flex"
            },
              null
              ],

              tabBarIcon: ({color, size}) => {
                if(route.name === 'Home'){
                  return(
                    <Ionicons name={'home-outline'}
                    size={size}
                    color={color}
                    />
                  );
                }
                
                else if(route.name === 'Profile'){
                  return(
                    <Ionicons name='md-person-outline'
                    size={size}
                    color={color}
                    />
                  );
                }
                else if(route.name === 'Settings'){
                  return(
                    <Ionicons
                      name={'md-settings-outline'}
                      size={size}
                      color={color}
                  />

                  );
                }
              }
          })
          }
          
          > 
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreenComponent} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
      
    );
    
};
export default MainPage;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
      //alignItems: 'center',
      justifyContent: 'center',
  },
});
