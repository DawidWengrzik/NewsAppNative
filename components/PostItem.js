import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import DoubleClick from 'react-native-double-tap';

import { useNavigation } from '@react-navigation/native'
import { authentication, db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const PostItem = ({post, specificCountryList, savedNotes, setSavedNotes}) => {

    const[addedToNote, setAddedToNote] = useState(false);
    const navigation = useNavigation();

    const {author, category, country, description, image, language, published_at, source, title, url} = post;

    const currentUser = authentication['currentUser']["uid"]
    
    const addPostToUserColection = async () => {
        const docRef = doc(db, 'usersData', currentUser)

        await updateDoc(docRef, {
            savedNews: arrayUnion({
                author: author,
                category: category,
                country: country,
                description, description,
                image: image,
                language: language,
                published_at: published_at,
                source: source,
                title: title, 
                url: url
            })
          })
          .catch(err => console.log(err))
    }

    const deletePostFromUserColection = async () => {
        const docRef = doc(db, 'usersData', currentUser)

        await updateDoc(docRef, {
            savedNews: arrayRemove({
                author: author,
                category: category,
                country: country,
                description, description,
                image: image,
                language: language,
                published_at: published_at,
                source: source,
                title: title, 
                url: url
            })
          })
          .catch(err => console.log(err))
    }

    return (
        <DoubleClick 
        singleTap={() => navigation.navigate('PostDetails', {
            post: post,
            specificCountryList: specificCountryList,
            savedNotes: savedNotes
        })}
        doubleTap={() => {
            console.log(savedNotes)
            if(!savedNotes.includes(post)){
                setSavedNotes([...savedNotes, post])
                setAddedToNote(!addedToNote)
                addPostToUserColection()
            }
            else{
                setSavedNotes(savedNotes.filter( (el) => {return el !== post }) )
                setAddedToNote(!addedToNote)
                deletePostFromUserColection()
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