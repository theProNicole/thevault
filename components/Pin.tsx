import { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Pin = (props) => {
    const [ratio, setRatio] = useState(1)
    const [isLiked, setIsLiked] = useState(false);
    const navigation = useNavigation()
    const {id, image, title} = props.pin

    
    useEffect(()=>{
        if(image){
            Image.getSize(image, (width, height) => setRatio(width / height))
        }
    },[image])
    
    const goToPinPage = () => {
        // console.log("pressed")
        navigation.navigate("PinScreen", {id});
    }
    

    const onLike = () => {
      setIsLiked(!isLiked); // Toggle the like state
      console.log("like");
  }


    return(
        <Pressable onPress={goToPinPage} style={styles.pin}>
        {/* <View style={styles.pin}> */}
            <View>
                <Image source={{uri: image}}
                    style={[styles.image, {aspectRatio: ratio}]}
                />
                <Pressable onPress={onLike} style={[styles.heartBttn, isLiked && styles.liked]}>
                    <Entypo name={isLiked ? "heart" : "heart-outlined"} size={15} color={isLiked ? "red" : "white"} />
                </Pressable>
            </View>
            {/* <Text style={styles.title} numberOfLines={2}>{title}</Text> */}
        {/* </View> */}
        </Pressable> 
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
    },
    pin: {
      width:'100%',
      padding: 2
    },
    title: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: 'bold',
      margin:5,
      color: "#181818"
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    image:{
      width: '100%',
      borderRadius: 20,
      shadowColor: "black",
    
    },
    heartBttn:{
        backgroundColor:"rgba(211, 207, 212, 0.5)",
        position: "absolute",
        top:10,
        left: 10,
        padding:5,
        borderRadius: 50
    },
    liked: {
      backgroundColor: "transparent", // Change style when liked
  }
  });
  export default Pin