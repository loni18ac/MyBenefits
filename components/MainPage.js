import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeScreen from './navComponents/HomeScreen';
import MapsScreenComponent from './navComponents/MapsScreen';
import ProfileScreen from './navComponents/ProfileScreen'
import {findFocusedRoute, NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

//Simpel tab bar laves i bunden af skærmen, som lader brugeren skifte mellem forskellige routes
const MainPage = () => {
    const Tab = createBottomTabNavigator();

//Her oprettes bruger state variablen
//Tab.Navigatoren i NavigationContaineren definerer vi først selve stylingen af de tre routes, Home, Profile og Settings
//Hvorefter vi nederst definerer komponenterne, der skal renderes, når brugeren trykker på tabBarIcon'erne
    return (
      <View style={styles.container}>
        
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            tabBarActiveBackgroundColor: '#e9f5f9',
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
                    color={'#a8d5e5'}
                    />
                  );
                }
                else if(route.name === 'Maps'){
                  return(
                    <Ionicons
                      name={'md-map-outline'}
                      size={size}
                      color={'#a8d5e5'}
                  />

                  );
                }
                else if(route.name === 'Profile'){
                  return(
                    <Ionicons name='md-person-outline'
                    size={size}
                    color={'#a8d5e5'}
                    />
                  );
                }
              
                
              }
          })
          }
          
          > 
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Maps" component={MapsScreenComponent} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
      
    );
    
};
//Eksport af MainPage, så den kan importeres og benyttes i andre komponenter
export default MainPage;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
      //alignItems: 'center',
      justifyContent: 'center',
  },
});
