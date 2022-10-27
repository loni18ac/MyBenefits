import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";
import {useState, useEffect} from "react";

//
function App() {

  //Deklarerer nye state variable
    //Vi bruge useState, som er et Hook, der lader os tilføje React state til funktionskomponenter.
    // vi kan dermed bevare værdierne imellem funktionernes kørsel
  const [hasLocationPermission, setlocationPermission] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([])
  const [selectedCoordinate, setSelectedCoordinate] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  /* Vi skal nu have brugerens tilladelse til at bruge enhedens lokation. 
  * Til dette bruges getLocationPermission, der med den asynkrone metode requestForegroundPermissionsAsync,
  * aktiverer en anmodning om tilladelse til at benytte enhedens position.
  * requestForegroundPermissionsAsync() beder brugeren om at 'grant permissions for location',
  * mens appen er i foreground (foreground services skal sende en notifikation)
  * Promiset fulfilles med PermissionResponse, og hvis dette er granted,
  * sættes værdien af locationPermission med dette resultat
  */
  const getLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync().then((item)=>{
      setlocationPermission(item.granted)
    } );

  };

  // useEffect kalder getlocationPermission, så vi dermed aktiverer den ovenstående funktion,
  // der sender en forespørgsels-notifikation til brugeren vedr. tilladelse til brug af enhedens lokation
  // Dette gøres når appen kører
  useEffect (() => {
    const response = getLocationPermission()
  });

  /*
  * Metoden updateLocation bruger det prædefinerede asynkrone kald, getCurrentPositionAsync, som returnerer enhedens aktuelle position
  * Resultatet fra kaldet sætter værdien til vores state variabel, currentlokation.
  * Accuracy.Balanced fortæller nøjagtigheden ved den angivne position. 
  * Accuracy er radius for usikkerhed ved lokationen målt i meter. 
  * Balanced tilføjer, at nøjagtigheden skal være indenfor 100 m.
    */
  const updateLocation = async () => {
    await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
      setCurrentLocation(item.coords)
    } );
  };
  /*
  * Arrow-funktionen handleLongPress tager et event, der henter værdien af et koordinatsæt
  * Denne værdi gemmes i en variabel, der tilføjes til et array af koordinater.
  */
  const handleLongPress = event => {
    const coordinate = event.nativeEvent.coordinate
    setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate])
  };

  /*
* Arrow-funkyionen handleSelectMarker tager det asynkrone parameter, coordinate, med som argument. 
* Coordinate sætter værdien af vores state variabel, selectedCoordinate.
* Så aktiveres det asynkrone kald med reverseGeocodeAsync.
* reverseGeocodeAsync omdanner koordinatsættet til en række data, der fortæller om område og adresse.
* selectedAddress holder så resultatet af det asynkrone kald
*/
  const handleSelectMarker = async coordinate =>{
    setSelectedCoordinate(coordinate)
    await Location.reverseGeocodeAsync(coordinate).then((data) => {
          setSelectedAddress(data)
        }
    )
  };


  //closeInfoBox sætter værdierne fra selectedAddress og selectedCoordinate til at være nul
  const closeInfoBox = () =>
      setSelectedCoordinate(null) && setSelectedAddress(null)

  // RenderCurrentLocation tager props med som argument og tjekker om, brugeren har tilladt brug af enhedens lokationsdata
  // Hvis ikke, returneres en tekstkomponent med instruktioner til at gå til indstillinger brugeren
  // Hvis granted og currentLocation ikke har en værdi, vil der fremvises en knap-komponent
  //Hvis granted og currentLocation har en værdi, vil lokationsdata blive vist i en infoboks
  const RenderCurrentLocation = (props) => {
    if (props.hasLocationPermission === null) {
      return null;
    }
    if (props.hasLocationPermission === false) {
      return <Text>No location access. Go to settings to change</Text>;
    }
    return (
        <View>
          <Button style title="update location" onPress={updateLocation} />
          {currentLocation && (
              <Text>
                {`lat: ${currentLocation.latitude},\nLong:${
                    currentLocation.longitude
                }\nacc: ${currentLocation.accuracy}`}
              </Text>
          )}
        </View>
    );
  };

//Derudover bruger vi SafeAreaView for at sikre, at indholdet ikke overskrider grænser for enheden,
//hvis det er en iOS version 11 eller nyere
  /*
  * Dernæst kaldes RenderCurrentLocation view
  * Mapview viser et Google Maps kort, hvor brugeren via showsUserLocation kan se egen lokation. 
  * I Mapview vises tre markører, der illustrerer lokationerne på brugerens fordele. 
  * Hver markør har en titel e.g. SATS Falkoner og en beskrivelse e.g. 'Fitnesscenter'
  * Alle koordinatsæt i userMarkerCoordinates ses som markører på kortet.
  * Ved hver markør, kan brugeren aktivere metoden handleSelectMarker gennem onPress,
  * hvormed selectedCoordinate og selectedAddres får en værdi, og der printes data om den valgte markør
  * så brugeren kan få mere information om stedet, hvor han/hun har en frynsegode til. 
  */
  {
    return (
        <SafeAreaView style={styles.container}>
          <RenderCurrentLocation props={{hasLocationPermission: hasLocationPermission, currentLocation: currentLocation}} />
          <MapView
              provider="google"
              style={styles.map}
              showsUserLocation
              onLongPress={handleLongPress}>
            <Marker
                coordinate={{ latitude: 55.68068253786292, longitude: 12.530595661781504 }}
                title="SATS Falkoner"
                description="Fitnesscenter"
            />
            <Marker
                coordinate={{ latitude: 55.67844195406537, longitude: 12.564970927038036  }}
                title="Jensens Bøfhus"
                description="Restaurant"
            />
            <Marker
                coordinate={{ latitude: 55.67133484535709, longitude: 12.556983441256698}}
                title="WEDO Kødbyen"
                description="Take-away"
            />
            {userMarkerCoordinates.map((coordinate, index) => (
                <Marker
                    coordinate={coordinate}
                    key={index.toString()}
                    onPress={() => handleSelectMarker(coordinate)}
                />
            ))}
          </MapView>
          {selectedCoordinate && selectedAddress && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                </Text>
                <Text style={styles.infoText}>
                  name: {selectedAddress[0].name}  region: {selectedAddress[0].region}
                </Text>
                <Button title="close" onPress={closeInfoBox} />
              </View>
          )}
        </SafeAreaView>
    );
  }
}


//----Lokal styling til ovenstående SafeAreaView
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: { flex: 1 },
  infoBox: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 15,
  },
});
export default App