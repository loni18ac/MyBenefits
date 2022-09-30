
import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import firebase from "firebase/compat";


  function LoginForm() {

    // Deklarerer ny state variable, som vi kalder email, password og errorMessage
    //Vi bruge useState, som er et Hook, der lader os tilføje React state til funktionskomponenter.
    // vi kan dermed bevare værdierne imellem funktionernes kørsel
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    /*Promise håndterer login af eksisterende bruger med firebase-metoden, signInWithEmailAndPassword, 
    der tager mail-adresse og kodeord som argumenter. Asynkront eksekveres login i firebase.  
    I catch sørger vi får at håntere fejl ved at sætte værdien for vores ovenstående state-variabel, errorMessage
    */
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }

    //Her defineres loginknappen, som aktiverer handleSubmit med onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Login" />;
    };

//Under teksten 'Login', har vi to TextInputs, der ved ændring af værdien af konstanterne, email og password, 
//sender den nye værdi som argument til call back funktionen, som sætter værdien i email og password.
// Hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.
    return (
        <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
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

//Styling til LoginFrom e.g. rød, hvis fejl
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

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default LoginForm