import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import DoubleClick from 'react-native-double-tap';
import SavedNoteContext from '../data/SavedNoteContext';
import { useNavigation } from '@react-navigation/native'

const PostItem = ({post, title, specificCountryList}) => {

    const[addedToNote, setAddedToNote] = useState(false);
    const [savedNotes, setSavedNotes] = useContext(SavedNoteContext);
    const navigation = useNavigation();

    return (
        
        <DoubleClick 
        singleTap={() => navigation.navigate('PostDetails', {
            post: post,
            specificCountryList: specificCountryList,
            savedNotes: savedNotes
        })}
        doubleTap={() => {
            if(!savedNotes.includes(post)){
                setSavedNotes([...savedNotes, post])
                setAddedToNote(!addedToNote)
            }
            else{
                setSavedNotes(savedNotes.filter( (el) => {return el !== post }))
                setAddedToNote(!addedToNote)
            }
        }}>
            <View style={styles.postBtn}>
                <Text style={styles.title}>{title}</Text>
                {
                !savedNotes.includes(post) ? <Icon name='plus' style={styles.icons}/> : <Icon2 name='done' style={[styles.icons, {fontWeight: 'bold', color: "#183153"}]}/>
                } 
            </View>           
        </DoubleClick>
        
    )
}

export default PostItem

const styles = StyleSheet.create({
    postBtn: {
        padding: 10,
        borderColor: '#183153',
        borderWidth: 1,
        borderRadius: 5,
        width: 270,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        width: '80%',
        textAlign: 'justify'
    },
    icons: {
        fontSize: 30,
        color: 'grey',
      }
})