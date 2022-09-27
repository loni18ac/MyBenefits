import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {CARS} from '../const';

const FlatListComponent = () => {

    const CarItem = ({item,msg}) => {
        return(
            <Text>
                {msg} "{item}"
            </Text>
        )
    }

    return(
        <View style={styles.container}>
            {/* Title med styling*/ }
            <Text style={{ fontSize: 20, textAlign:'center',paddingTop:40 }}>
                1 Mine biler - Flatlist
            </Text>
            {/* FlatList komponent med title propertien og en værdi HANS*/ }
            <FlatList
                style={{height:80}}
                data={CARS}
                renderItem={({item})=>{
                    {/*Render CarItem, her er det vigtigt at kalde et subkomponent*/}
                    return(
                        <CarItem
                            item={item}
                            msg={"Oh boy i love"}
                        />
                    )
                }}
                keyExtractor={item => item}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    inlineScroll:{
        height:80
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});



export default FlatListComponent;