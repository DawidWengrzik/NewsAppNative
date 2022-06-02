import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PostItem from '../components/PostItem'
import SavedNoteContext from '../data/SavedNoteContext'

const SavedNews = () => {

  const [savedNotes, setSavedNotes] = useContext(SavedNoteContext);
  
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