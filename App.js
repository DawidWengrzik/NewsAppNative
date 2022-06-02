import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SavedNotes from './screens/SavedNotes';
import ProfileScreen from './screens/ProfileScreen';
import SpecificCountryNews from './components/SpecificCountryNews';
import PostDetails from './components/PostDetails';
import React, { useState } from 'react';
import SavedNoteContext from './data/SavedNoteContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [savedNotes, setSavedNotes] = useState([]);

  return (
    <NavigationContainer>
      <SavedNoteContext.Provider value={[savedNotes, setSavedNotes]}>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Login" component = {LoginScreen} />
            <Stack.Screen options={{headerShown: false}} name="Home" component = { HomeScreen } />
            <Stack.Screen options={{headerShown: false}} name="SavedNotes" component = { SavedNotes } />
            <Stack.Screen options={{headerShown: false}} name="ProfileScreen" component = { ProfileScreen } />
            <Stack.Screen options={{headerShown: false}} name="SpecificCountryNews" component = { SpecificCountryNews } />
            <Stack.Screen options={{headerShown: false}} name="PostDetails" component = { PostDetails } />
            <Stack.Screen name="News" component={HomeScreen} />
        </Stack.Navigator>
      </SavedNoteContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
