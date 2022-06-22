import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {  addUserToDB, authentication } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    useEffect( () => {
        const unsubscribe = authentication.onAuthStateChanged(user => {
            if(user) { 
                navigation.navigate("ProfileScreen")
            }
        })
        return unsubscribe;
        
    }, [])

    const handleRegister = () => {
    // Handle register button funcion - register user to firestore auth
        createUserWithEmailAndPassword(authentication, email, password).
        then(() => {
            setEmail('') 
            setPassword('')    
            addUserToDB(authentication['currentUser']["uid"])        
        }).
        catch((error)=> { 
        setEmail('') 
        setPassword('')
        alert(error.message)
        }
    )}

    const handleLogIn = () => {
    // Handle login button funcion - login user to his account
        signInWithEmailAndPassword(authentication, email, password).
        then(() => {
            setIsSignedIn(true);
        }).
        catch((error)=> { 
        setEmail('') 
        setPassword('')
        alert(error.message)
        
    })}


    return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="height"
    >
        <Icon name='globe' style={styles.icons}></Icon>
        <View style={styles.inputContainer}>
        <TextInput 
            placeholder="Email"
            value= { email }
            onChangeText={text => setEmail(text)}
            style={styles.input}/>
        <TextInput 
            placeholder="Password"
            value= { password }
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={ handleLogIn } style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ handleRegister } style={[styles.button, styles.buttonRegister]}>
                <Text style={[styles.buttonText, styles.buttonTextRegister]}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
    }

    export default LoginScreen

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    }
    ,
    inputContainer: {
        marginTop: 100,
        width: '80%',
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontSize: 15,
        marginBottom: 30
    },
    buttonContainer:{
        width: '60%',
        marginTop: 40
    },  
    button:{
        width: '100%',
        backgroundColor: '#183153',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15, 
        color: 'white'
    },
    buttonRegister: {
        backgroundColor: 'white',
        borderColor: '#183153',
        borderWidth: 2
    },
    buttonTextRegister: { 
        color: '#183153'
    },
    icons: {
        fontSize: 50,
        color: '#183153',
        position: 'absolute',
        top: 50
    }
})