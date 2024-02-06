
import MasonryList from '@/components/MasonryList';
import pins from '@/assets/data/pins';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useNhostClient } from '@nhost/react';
import { Alert } from 'react-native';


 export default function HomeScreen() {
  //  const nhost = useNhostClient()
  //  const [pins, setPins] = useState([])
  //  const fetchPins = async ()=>{
  //  const response = await nhost.graphql.request(
  //     `query MyQuery {
  //       Mood {
  //         created_at
  //         id
  //         image
  //         title
  //         user_id
  //       }
  //     }`
  //   )
  // //  console.log(response)
  //   if (response.error){
  //    Alert.alert("Error fetching pins")
  //  }else{
  //  setPins(response.data)
  //   }
  // }
  // useEffect(() => {
  //   fetchPins()
  // },[])

  return (
    <MasonryList pins={pins}/>
  );
}


