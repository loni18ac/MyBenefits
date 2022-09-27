
import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
//import firebase from 'firebase';
import FIRMS from '../const'
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import SelectList from 'react-native-dropdown-select-list';

//Sign Up form component
export default function SignUpForm  (props)  {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [firm, setFirm] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [selected, setSelected] = useState("");

    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };

    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(firstName, surname, email, firm, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }   
        

        return(
            <View>
                 <Text style={styles.header}>Not a user? Sign up here!</Text>
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
                    <SelectList setSelected={setSelected} data={FIRMS} onSelect={() => alert(selected)} />
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
        )
};




const styles = StyleSheet.create({
    error: {
        color: 'lightblue',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        

    },
    header: {
        fontSize: 40,
    },
});