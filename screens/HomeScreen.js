import { StyleSheet, View, Image, TouchableOpacity, Text, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = ({ accessCode, accessCounter, setAccessCounter }) => {

  const [news, setNews] = useState([])
  const navigation = useNavigation();

  
  const apiRefUA = `http://api.mediastack.com/v1/news?access_key=`+accessCode+`&countries=ua`
  const apiRefDE = `http://api.mediastack.com/v1/news?access_key=`+accessCode+`&countries=de`
  const apiRefGB = `http://api.mediastack.com/v1/news?access_key=`+accessCode+`&countries=gb`
  const apiRefUS = `http://api.mediastack.com/v1/news?access_key=`+accessCode+`&countries=us`

  useEffect(() =>{ 

    const getData = async (ref) => {
      return await fetch(ref)
      .then(res => res.json())
      .then(json => {
        setNews(prevState => [...prevState, ...json.data])
      })
      .catch(err => console.log(err))
    }


    if(accessCode){
      getData(apiRefUA)
      .catch(err => alert(err))
      getData(apiRefDE)
      .catch(err => alert(err))
      getData(apiRefGB)
      .catch(err => alert(err))
      getData(apiRefUS)
      .catch(err => alert(err))
      setAccessCounter(accessCounter+4)
    }
    
  },[])

  const handleSpecificCountryList = (country) => {
    const filteredNews = news.filter((el) => {
      if (el.country === country){ return el }
    })
    return filteredNews
  }
  return (
    <View style={styles.container}>
      <NavBar />      
      {/* Make it  more clear ! require dynamic image !*/}
      {/* If access code is entered */}
      { 
        accessCode ? 
        <View style={styles.countriesContainer}>
          <TouchableOpacity style={styles.countryBtn}
          onPress={() => navigation.navigate('SpecificCountryNews', {
            specificCountryList: handleSpecificCountryList("ua")
          })}
          
        >
          <Image source={require('../data/ukraine.png')} style={styles.images}/>
          <Text style={styles.countryName}>Ukraine</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.countryBtn}
          onPress={() => navigation.navigate('SpecificCountryNews', {
          specificCountryList: handleSpecificCountryList("de")
        })}
        >
            <Image source={require('../data/deutschland.png')} style={styles.images}/>
            <Text style={styles.countryName}>Deutschland</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.countryBtn}
          onPress={() => navigation.navigate('SpecificCountryNews', {
          specificCountryList: handleSpecificCountryList("gb")
        })}>
            <Image source={require('../data/uk.png')} style={styles.images}/>
            <Text style={styles.countryName}>United Kingdom</Text>
        </TouchableOpacity>   
        <TouchableOpacity style={styles.countryBtn}
          onPress={() => navigation.navigate('SpecificCountryNews', {
          specificCountryList: handleSpecificCountryList("us")
        })}>
            <Image source={require('../data/usa.png')} style={styles.images}/>
            <Text style={styles.countryName}>United States</Text>
        </TouchableOpacity>   
      </View>
      :
      <View style={{height: '15%', alignItems: 'center', justifyContent: 'space-around'}}>
        {/* If there is no access code*/}
        <Text>Enter access code in user panel</Text>
        <TouchableOpacity 
          onPress={() => Linking.openURL('https://mediastack.com/')}>
          <Text style={styles.button}>
            Get your key!
          </Text>
        </TouchableOpacity>
        
      </View>
      }
      
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
    texcior: {
      fontSize: 15
    },
    countriesContainer: {
      display: 'flex',
      height: '80%',
      justifyContent: 'space-around'
      
    },

    newsArea: {
      padding: 15,
      height: '80%'
    },
    images: {
      width: 100,
      height: 60,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#183153',
    },
    countryBtn: {
      display: 'flex',
      alignItems: 'center', 
      minWidth: 200
    },
    countryName: {
      color: '#183153',
      fontWeight: 'bold',
      fontSize: 20
    },
    button:{
      width: '50%',
      backgroundColor: '#183153',
      borderRadius: 10,
      color: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default HomeScreen;