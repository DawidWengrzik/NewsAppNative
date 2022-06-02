import { View, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import React, {} from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import PostItem from './PostItem';

const SpecificCountryNews = ({ route }) => {

  const { specificCountryList } = route.params;

  return (
    <View style={styles.container}>
      <NavBar/>
      <SafeAreaView style={styles.newsArea}>
        {
          <FlatList
          style={styles.flatList}
          data={specificCountryList}
          renderItem={(item)=> <PostItem 
            post = {item.item}
            title = {item.item.title}
            specificCountryList = {specificCountryList}
            />}
        />
        }
      </SafeAreaView>
      <Footer/>
    </View>
  )
}

export default SpecificCountryNews

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  newsArea: {
    padding: 15,
    height: '80%',
  },
  flatList:{
    flex: 1,
  }
})