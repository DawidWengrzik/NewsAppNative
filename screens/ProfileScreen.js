import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { TextInput, TouchableOpacity, Alert } from 'react-native'
import { authentication, addUserToDB } from '../firebase'

const ProfileScreen = ({ accessCode, setAccessCode, accessCounter, setAccessCounter }) => {

  const [inputCode, setInputCode] = useState('');

  const handleAccessButton = async () => {
    if(inputCode === ''){
      return(
        Alert.alert(
        "Enter access code"
      ))
    }
    const getData = async () => {
      return await fetch(`http://api.mediastack.com/v1/news?access_key=`+inputCode)
      .then(res => res.json())
      .then(json => json.data)
      .then(data => {
        if (data !== undefined) {
          setAccessCounter(1)
          setAccessCode(inputCode)
        }
        else{
          Alert.alert(
            "Wrong access code!",
            "Access code is incorrect or inactive",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ]
          );
        }
      })
      .catch(err => alert(err))
    }
    await getData()
    setInputCode('')
  }

  return (    
    <View style={styles.container}>
      <NavBar />
      <View style={styles.inputContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Enter your access code</Text>
          <TextInput 
                placeholder="Access Code"
                value= { inputCode }
                onChangeText={code => setInputCode(code)}
                style={styles.input} />
          <TouchableOpacity onPress={ handleAccessButton } style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          { accessCode ? 
            <View style={{alignItems: 'center'}}>
              <Text>Your access code is: </Text> 
              <Text>{accessCode}</Text>
              <View style={styles.usageBar}>
                <Text style={styles.counterValue}> {accessCounter}/500 </Text>
                <View style={[styles.usageBarValue, {width: `${accessCounter / 500 * 100 }%`}]}></View>
              </View>
            </View>
            : null
          }
        </View>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center', 
    },  
    inputContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      height: '50%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    headerText: {
      fontSize: 25,
    },
    input: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontSize: 20,
        marginBottom: 30
    },
    button:{
      width: '50%',
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
    usageBar: {
      marginTop: 15,
      borderColor: '#183153',
      borderWidth: 1,
      borderStyle: 'solid',
      width: 200,
      height: 20,
      borderRadius: 10,
      position: 'relative'
    },
    usageBarValue: {
      height: '100%',
      borderRadius: 10,
      backgroundColor: '#183153',
    },
    counterValue: {
      position: 'absolute',
      left: 80
    }
})

export default ProfileScreen;