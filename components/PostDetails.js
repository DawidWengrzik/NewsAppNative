import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const PostDetails = ({ route }) => {

    const { post } = route.params;
    const { title, author, image, description, published_at: date, country, source } = post;
    const navigation = useNavigation();
    const { specificCountryList, savedNotes } = route.params;
    
    return (
        <View style={styles.container}>
            <NavBar/>
            <View style={styles.ndBar}>
                <TouchableOpacity 
                style={styles.backBtn}
                onPress=
                {() => {
                    if (specificCountryList){
                        navigation.navigate('SpecificCountryNews', { specificCountryList: specificCountryList })
                    } else {
                        navigation.navigate('SavedNotes', { savedNotes: savedNotes })
                }}}>
                    <Icon name='arrow-left' style={styles.icons}/>
                </TouchableOpacity>
                <Text style={styles.sourceText}>Source: {source}</Text>
            </View>            
            <SafeAreaView style={styles.newsArea}>
                <ScrollView>                
                    <Text style={styles.titleText}>{title}</Text>
                    {author ? <Text style={styles.titleText}>{author}</Text> : null }
                    <Text style={[styles.describeText, { fontWeight: 'bold', marginBottom: 10}]}>
                        {`${country.toUpperCase()} ${moment(date).format('DD/MM/YYYY')}`}
                    </Text>
                    {
                        image !== "" ?
                        <Image
                            style={{width: 200, height: 200, marginBottom: 30, alignSelf: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#183153'}}
                            source={{
                            uri: image,
                        }}
                        /> : null
                    } 
                    <Text style={styles.describeText}>{description}</Text>
                </ScrollView>      
                
            </SafeAreaView>
            <Footer/>
        </View>
    )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      newsArea: {
        padding: 5,
        height: '70%',
        width: 300,
        display: 'flex',
        alignItems: 'center'
      },
      titleText:{
          fontSize: 30,
          textAlign: 'center',
          marginBottom: 30
      },
      describeText:{
        fontSize: 20,
        textAlign: 'justify'
      },
      flatList:{
        flex: 1,
      },
      sourceText:{
          alignSelf: 'center',
      },
      icons: {
        fontSize: 25,
        color: 'black',
      },
      ndBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
      backBtn:{
          position: 'absolute',
          left: 10
      }
      
      
})