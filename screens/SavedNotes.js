import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PostItem from '../components/PostItem'
import SavedNoteContext from '../data/SavedNoteContext'
import { authentication, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const SavedNews = () => {

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
      <NavBar />
      <SafeAreaView style={styles.newsArea}>
        {
          <FlatList
          style={styles.flatList}
          data={savedNotes}
          renderItem={(item)=> <PostItem 
            post = {item.item}
            title = {item.item.title}
            savedNotes={savedNotes}
            savedNotes = {savedNotes}
            setSavedNotes={setSavedNotes}
            />}
        />
        }
      </SafeAreaView>
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
    newsArea: {
      padding: 15,
      height: '80%',
    },
    flatList:{
      flex: 1,
    }
})

export default SavedNews;