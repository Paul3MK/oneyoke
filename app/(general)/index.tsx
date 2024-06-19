import { Image, ImageBackground, ImageSourcePropType, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import CTA from '@/components/CTA/CTA';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LinkBox from '@/components/LinkBox';

// import img from "../../../assets/images/nina-strehl-Ds0ZIA5gzc4-unsplash.jpg"

export default function GeneralHomeScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={{...styles.heading, ...styles.mainHeading}}>Welcome to Kingdom Embassy!</Text>
                {/* <ScrollView contentContainerStyle={styles.eventTrack} horizontal>
        { eventsList && eventsList.slice(0,3).map(event=><EventCard image={{uri: event.image}} linkTo={event._id} title={event.name} date={event.date} />)}
        </ScrollView> */}
                <Text style={styles.copy}>We are a people of prayer, preparing the church for the second coming of Christ.</Text>
            </View>
            {/* <Image source={{ uri: "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} resizeMode='cover' style={{ height: 200, width: 200 }} /> */}
            <View style={styles.section}>
                <Pressable onPress={()=>router.navigate("https://www.youtube.com/watch?v=xqDlB-7o7BA")} style={styles.video}>
                    <Text style={styles.copy}>Watch our latest service</Text>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text style={styles.copy}>Come visit us at any of our locations. We meet on Thursdays and Sundays.</Text>
                <LinkBox text="View locations" link="" target='modal'/>
                {/* <Text></Text>
                <LinkBox text="View service times" link="" /> */}
            </View>
            {/* <View style={styles.section}>
                <Text style={styles.heading}>Contribute</Text>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    copy: { 
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    eventTrack: {
        height: 120,
        width: "auto",
        display: "flex",
        gap: 8
    },
    section: {
        paddingHorizontal: 16,
    },
    heading: {
        fontFamily: "SplineSans_600SemiBold",
        fontSize: 24,
        marginVertical: 16
    },
    mainHeading: {
        fontFamily: "SplineSans_400Regular",
        maxWidth: "75%",
        paddingVertical: 16
    },
    video: {
        height: 200,
        width: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4a4a4a",
        marginVertical: 16
    }
});