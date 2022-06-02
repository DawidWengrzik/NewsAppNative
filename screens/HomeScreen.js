import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import newsJson from '../data/db.json'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([])
  const navigation = useNavigation();

  useEffect(() =>{ 
    setNews([])
    setNews(newsJson.posts);
    setIsLoading(false);
    getData()
  },[])

  const getData = async () =>{
    const postCol = collection(db, 'posts');
    const postSnapshot = await getDocs(postCol);
    const newsList = postSnapshot.docs.map(signleNews => signleNews.data());
  }

  const handleSpecificCountryList = (country) => {
    const filteredNews = news.filter((el) => {
      if (el.country === country){ return el }
    })
    return filteredNews
  }
  return (
    <View style={styles.container}>
      <NavBar />      
      <TouchableOpacity style={styles.countryBtn}
        onPress={() => navigation.navigate('SpecificCountryNews', {
          specificCountryList: handleSpecificCountryList("pl")
        })}
        
      >
        <Image source={require('../data/poland.png')} style={styles.images}/>
        <Text style={styles.countryName}>Poland</Text>
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