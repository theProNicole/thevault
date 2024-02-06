import React from 'react';
import { StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import { View } from '@/components/Themed';
import Pin from '@/components/Pin';

interface IMasonryList{
    pins:{
        id: number,
        image: string, 
        title: string,
    }[];
}

const MasonryList = ({pins}: IMasonryList) => {
  const width = useWindowDimensions().width
  const numCols = Math.ceil(width/200)
  //  console.log(pins)

    return(
        <ScrollView contentContainerStyle={{width: "100%"}}>
        <View style={styles.container}>
          {Array.from(Array(numCols)).map((_,colIndex)=>(
          <View style={styles.column}  key={`col-${colIndex}`}>
            {pins
            .filter((_, index) => index % numCols === colIndex)
            .map((pin) => (
              <Pin pin={pin} key={pin.id}/>
            ))}
          </View>
          ))}
        </View>
        </ScrollView>
    )
}
export default MasonryList
const styles = StyleSheet.create({
    container: {
      padding: 3,
      flexDirection:"row",
    },
    column:{
      flex: 1
    }
  });
  