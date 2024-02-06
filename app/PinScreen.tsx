import { useState, useEffect } from "react"
import { Text, StyleSheet, View, Image, Pressable, Modal} from "react-native"
import pins from "../assets/data/pins"
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native";
import NotFoundScreen from "./+not-found";
import { BlurView } from "expo-blur";

const PinScreen = () => {
    const [ratio, setRatio] = useState(1)
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const route = useRoute()
    const pinId = route.params?.id
    const pin = pins.find((p)=>p.id===pinId)
    

    useEffect(()=>{
        if(pin?.image){
            Image.getSize(pin.image, (width, height) => setRatio(width / height))
        }
    },[pin])

    if(!pin){
        <NotFoundScreen/>
    }

    const goBack = () => {
        navigation.goBack();
    }
  

    return(
            <Modal visible={true} animationType='slide' transparent={true} >
                <BlurView intensity={20} style={styles.modalContainer}>
                    <Image 
                        source={{uri: pin?.image}} 
                        style={[styles.image, {aspectRatio: ratio}]} 
                    />
                        <Text style={styles.title}>
                            {pin?.title}
                        </Text>
                        <Pressable onPress={goBack} style={[styles.backBttn, {top: insets.top + 5 }, {left:insets.left + 20}]} > 
                        <FontAwesome name="chevron-left" size={24} color="white" />
                        </Pressable>
                </BlurView>
            </Modal> 
    )
}
export default PinScreen

const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalContainer: {
        width: "100%",
        height:"100%",
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image:{
        width: "90%",
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom:20
    },
    title:{
        fontSize: 20,
        color:"white",
        fontWeight: 'bold',
        textAlign:"center"
    },
     backBttn:{
        position: 'absolute',
     },
})