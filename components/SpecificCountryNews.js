import { View, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import React, {} from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import PostItem from './PostItem';
import { useContext, useEffect } from 'react';
import SavedNoteContext from '../data/SavedNoteContext';
import { authentication, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const SpecificCountryNews = ({ route }) => {

  const { specificCountryList } = route.params;

  const [savedNotes, setSavedNotes] = useContext(SavedNoteContext);

  const getSavedNotesFromFirestore = async() => {
    const currentUser = authentication['currentUser']["uid"]

    const docRef = doc(db, "usersData", currentUser);
    const docSnap = await getDoc(docRef);
    setSavedNotes([...docSnap.data()["savedNews"]])
  }
  
  useEffect(() => { 
    getSavedNotesFromFirestore()
  }, [])

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
            savedNotes = {savedNotes}
            setSavedNotes = {setSavedNotes}
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