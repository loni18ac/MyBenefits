
import React, {useState} from 'react';
import {Button,
    Text,
    View,
    TextInput,
    StyleSheet
} from 'react-native';
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

function SignUpForm() {
    // Deklarerer ny state variable til brugerens informationer i sign up-processen samt errorMessage
    //Vi bruge useState, som er et Hook, der lader os tilføje React state til funktionskomponenter.
    // vi kan dermed bevare værdierne imellem funktionernes kørsel    
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //Her defineres den knap, som brugeren trykker på ved oprettelsen
    //den aktiverer handleSubmit() med onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };


    /*Promise håndterer oprettelsen af ny bruger med firebase-metoden, createUserWithEmailAndPassword, 
    der tager mail-adresse og kodeord som argumenter. Asynkront eksekveres oprettelsen i firebase.  
    I catch sørger vi får at håntere fejl ved at sætte værdien for vores ovenstående state-variabel, errorMessage
    */
    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }

//Under teksten 'Sign up', har vi to TextInputs, der ved ændring af værdien af konstanterne, såsom email og password, 
//sender den nye værdi som argument til call back funktionen, som sætter værdien i email og password osv.
// Hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.
    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Surname"
                value={surname}
                onChangeText={(surname) => setSurname(surname)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

//Styling til SignUpForm e.g. hvis fejl, så rød
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
});

//Eksport af SignUpForm, så den kan importeres og benyttes i andre komponenter
export default SignUpForm