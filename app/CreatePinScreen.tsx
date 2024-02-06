import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function CreatePinScreen() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("")
  const navigation = useNavigation()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    console.warn(title);
  }

  const goBack = () => {
    // Reset the image and title state
    setImage(null);
    setTitle("");
    navigation.goBack();
  }


  return (
    <View style={styles.root}>
      {!image && <Button title="Upload your mood" onPress={pickImage} />}
      {image && (
        <ScrollView >
        <View style={styles.imgContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          </View>
          <TextInput placeholder="Title..." style={styles.input} value={title} onChangeText={setTitle}/>
          <View style={styles.fixToText}>
          <Pressable style={styles.submitBttn} onPress={onSubmit}>
            <Text style={styles.text}>Submit Mood</Text>
            </Pressable>
          <Pressable style={styles.cancelBttn} onPress={goBack} >
          <Text style={styles.text}>Cancel</Text>
          </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    root:{
        flex: 1, 
        backgroundColor:"white",
        alignItems: 'center',
        justifyContent: 'center', 
        padding:10
    },
    input:{
        borderBottomColor: "gains",
        borderBottomWidth:1,
        padding: 10,
        width: "100%",
        borderRadius:5
    },
    imgContainer:{
        backgroundColor:"#fcfcfc",
        padding:2
    },
    image:{
        width: "100%",
        aspectRatio:1 ,
        marginVertical:10
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
      padding:10
    },
    submitBttn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: "#038cfc",
      },
    cancelBttn: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: 'black',
      },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})
