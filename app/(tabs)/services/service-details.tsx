import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import CTA from "@/components/CTA/CTA";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av"

export default function ServiceDetailsScreen() {

    const services = useQuery(api.worshipService.get)!
    const param = useLocalSearchParams<{ serviceId: string }>()

    const [loadedService, setLoadedService] = useState<undefined | any>()

    useEffect(() => {
        setLoadedService(services.filter(service => service._id == param.serviceId)[0])
    }, [services])


    return (
        <ScrollView style={style.container}>
            <View style={style.header}>
                <Text style={style.h1}>{loadedService?.time} service on {loadedService?.date}</Text>
            </View>
            <View style={style.section}>
                <Text style={style.h2}>Order</Text>
                {loadedService?.order.map(orderSection => <OrderSection key={orderSection.orderSectionName} name={orderSection.orderSectionName}>
                    {orderSection.orderSectionContent.map(content => <Item key={content.name} item={content} />)}
                </OrderSection>)}
            </View>
            <View style={style.section}>
                <Text style={style.h2}>Files</Text>
                <></>
                <CTA action={()=>router.navigate("/services/file-upload")} text="Add file"/>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: "100%"
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    section: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    h1: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 22
    },
    h2: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 18
    }
})

const OrderSection = ({ name, children }) => {
    const customStyle = StyleSheet.create({
        text: {
            fontFamily: "SplineSans_600SemiBold",
            fontSize: 16,
            borderTopWidth: 1,
            borderTopColor: "#fff"
        },
        section: {
            paddingVertical: 4, 
            gap: 8
        }
    })
    return (
        <View style={customStyle.section}>
            <Text style={customStyle.text}>{name}</Text>
            {children}
        </View>
    )
}

const Item = ({ item }) => {

    const customStyle = StyleSheet.create({
        itemCard: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        text: {
            fontSize: 16,
            fontFamily: "SplineSans_400Regular"
        },
        caption: {
            fontSize: 14,
            fontFamily: "SplineSans_400Regular",
            opacity: 0.8
        },
        itemDetailsWrapper: {
            gap: 4
        }

    })

    return (
        <View style={customStyle.itemCard}>
            <View style={customStyle.itemDetailsWrapper}>
                <Text style={customStyle.text}>{item.itemName}</Text>
                <Text style={customStyle.caption}>{item.itemSubtitle}</Text>
            </View>
            <Text style={customStyle.text}>{item.itemDuration}</Text>
        </View>
    )
}

const AudioCard = ({ title, link }: { title: string, link: string }) => {

    const [soundPlaying, setSoundPlaying] = useState<boolean>(false);

    const customStyles = StyleSheet.create({
        card: {
            borderColor: "#fff",
            padding: 8,
            borderWidth: 1,
            borderRadius: 2,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            maxWidth: 140
        }
    })

    
    const playbackObject  = useRef(new Audio.Sound())

    async function playSound(){
        const status = await playbackObject.current.getStatusAsync()
        if(!status.isLoaded){
            await playbackObject.current.loadAsync({ uri: link })
        }
        setSoundPlaying(true)
        return await playbackObject.current.playAsync()
    }

    async function pauseSound(){
        setSoundPlaying(false)
        console.log("pausing")
        const status = await playbackObject.current.getStatusAsync()
        let pause
        if(status.isLoaded){
            pause = await playbackObject.current.pauseAsync()
        }   
        return pause
    }

    return (
        <Pressable onPress={soundPlaying ? pauseSound : playSound} style={customStyles.card}>
            <MaterialIcons name={soundPlaying ? "pause-circle" : "play-circle"} size={24} color={"#fff"} />
            <Text>{title}</Text>
        </Pressable>
    )
}