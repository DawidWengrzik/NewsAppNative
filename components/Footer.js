import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { authentication } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const Footer = () => {

  const navigation = useNavigation();

  const handleSignOut = () =>{
    authentication.signOut()
    .then(() => navigation.replace("Login"))
    .catch(error => alert(error.message))
  }

  const handleSavedNews = () =>{
    navigation.replace("SavedNotes")
  }

  const handleProfile = () =>{
    navigation.replace("ProfileScreen")
  }

  return (
    <View style={styles.footer}>       
       <TouchableOpacity>
          <Icon2 name='user' style={styles.icons} onPress={ handleProfile } /> 
        </TouchableOpacity> 
        <TouchableOpacity>
            <Icon name='note' style={styles.icons} onPress={ handleSavedNews } />
        </TouchableOpacity>         
        <TouchableOpacity>
          <Icon name='logout' style={styles.icons} onPress={ handleSignOut } /> 
        </TouchableOpacity>        
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '101%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-around',
    borderTopColor: '#000',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icons: {
    fontSize: 35,
    color: '#183153',
  }
})

export default Footer;