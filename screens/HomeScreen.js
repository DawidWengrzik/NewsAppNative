import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'
import { authentication, addUserToDB } from '../firebase'

const HomeScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([])
  const navigation = useNavigation();

  const currentUser = authentication['currentUser']["uid"]
  const apiRefUA = `http://api.mediastack.com/v1/news?access_key=e2baa0726ff5353621c2c0075f6bef9b&countries=ua`
  const apiRefDE = `http://api.mediastack.com/v1/news?access_key=e2baa0726ff5353621c2c0075f6bef9b&countries=de`
  const apiRefGB = `http://api.mediastack.com/v1/news?access_key=e2baa0726ff5353621c2c0075f6bef9b&countries=gb`
  const apiRefUS = `http://api.mediastack.com/v1/news?access_key=e2baa0726ff5353621c2c0075f6bef9b&countries=us`

  useEffect(() =>{ 
    //Upload current user to database
    const uploadUsersData = async () => {
      const data = await addUserToDB(currentUser)
      return data
    }

    const getData = async (ref) => {
      return await fetch(ref)
      .then(res => res.json())
      .then(json => {
        setNews(prevState => [...prevState, ...json.data])
      })
      .catch(err => console.log(err))
    }

    uploadUsersData()
    .catch(err => alert(err))

    getData(apiRefUA)
    .catch(err => alert(err))
    getData(apiRefDE)
    .catch(err => alert(err))
    getData(apiRefGB)
    .catch(err => alert(err))
    getData(apiRefUS)
    .catch(err => alert(err))
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
    }
})

export default HomeScreen;