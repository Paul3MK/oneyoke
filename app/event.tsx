import { View, Text } from "@/components/Themed";
import NavigateButton from "@/components/CTA/NavigateButton";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function EventsModal() {

    const local = useLocalSearchParams<{ ev: string }>()


    const events = useQuery(api.events.get)!
    const [eventData, setEventData] = useState<any>()

    useEffect(() => {
        setEventData(events.filter((event) => event._id == local.ev)[0])
    }, [local])

    if (!eventData) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View style={style.container}>
                <ImageBackground source={{ uri: eventData.image }} style={style.header}>
                    <View style={style.headerWrapper}>
                        <View style={style.titleWrapper}>
                            <Text style={style.headerText}>{eventData.name}</Text>
                            <Text style={style.headerText}>{eventData.date}</Text>
                        </View>
                        <Text>Led by {eventData.lead}</Text>
                    </View>
                </ImageBackground>
                <ScrollView style={style.contentWrapper}>
                    <View style={style.section}>
                        <Text>{eventData.details}</Text>

                    </View>
                    <View style={style.section}>
                        <Text style={style.caption}>Location</Text>
                        <Text>{eventData.location}</Text>
                    </View>
                    <View style={style.section}>
                        <Text style={style.caption}>Time</Text>
                        <Text>{eventData.startTime}–{eventData.endTime}</Text>
                    </View>
                </ScrollView>
                <View style={style.footer}>
                    <NavigateButton text="Register"/>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // borderColor: "#f00",
        // borderWidth: 1
    },
    header: {
        // flex: 1
    },
    headerWrapper: {
        height: 200,
        width: "100%",
        paddingHorizontal: 16,
        backgroundColor: "#00000044",
        justifyContent: "center",
    },
    headerText: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 24
    },
    titleWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#00000000"
    },
    contentWrapper: {
        height: "auto",
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 16
    },
    footer: {
        // flex: 1,
        height: "auto"
    },
    section: {
        paddingVertical: 8
    },
    caption: {
        fontFamily: "SplineSans_600SemiBold"
    }
})