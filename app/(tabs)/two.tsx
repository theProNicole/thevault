import { StyleSheet, Image, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import MasonryList from '@/components/MasonryList';
import pins from '@/assets/data/pins';
import { Entypo, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {

  return (
    <View style={styles.header}>
    <SafeAreaView>
    <ScrollView style={styles.container}>
      <View style={styles.icons}>
          <Feather name="share" size={20} style={styles.icon}/>
            <Entypo
              name="dots-three-horizontal"
              size={20}
              style={styles.icon}
            />
        </View>
        <Image 
            style={styles.image}
            source={{
              uri: "https://i.pinimg.com/474x/48/86/21/488621f0e0b1c833476ccea1e58307b0.jpg"
            }}
        />
        <View style={styles.text}>
       <Text style={styles.title}>UserName</Text>
        <Text style={styles.subtitle}>125 Following | 7M Followers</Text>
      </View>
      <MasonryList pins={pins}/>
    </ScrollView>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    padding:10,
  },
  header:{
    alignItems: "center",
    justifyContent:"center"
  },
  text:{
    alignItems: "center",
    justifyContent:"center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  subtitle:{
    margin:5,
    fontWeight: "600",
  },
  image:{
    width: "100%",
    aspectRatio: 1,
    borderRadius: 60,
    marginVertical:10
  },
  icons:{
    flexDirection: "row",
    alignSelf: "flex-end",
    padding:0,
    marginBottom:5
  },
  icon:{
    paddingHorizontal:10
  },
});
