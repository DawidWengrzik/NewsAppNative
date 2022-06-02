import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <NavBar />
      <Text>Profile Screen</Text>
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
})

export default ProfileScreen;