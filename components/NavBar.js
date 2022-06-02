import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const NavBar = () => {

  const navigation = useNavigation();

  const handleHomePage = () =>{
    navigation.replace("Home")
  }

  return (
    <View style={styles.navbar}>
        <TouchableOpacity>
            <Icon name='globe' style={styles.icons} onPress={ handleHomePage }/>
        </TouchableOpacity>          
    </View>
  )
}

const styles = StyleSheet.create({
    navbar: {
        width: '100%',
        height: 90,
        backgroundColor: '#183153',
        alignItems: 'center', 
        justifyContent: 'flex-end',
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    icons: {
      fontSize: 45,
      color: 'white',
    }
})

export default NavBar;