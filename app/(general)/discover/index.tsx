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

export default function GeneralHomeScreen() {

    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.mainHeading}>Discover Kingdom Embassy</Text>
                <Text style={styles.text}>Find out more about our story, leadership and our teams. Connect with us and get plugged into church life.</Text>
            </View>
            {/* <Image source={{ uri: "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} resizeMode='cover' style={{ height: 200, width: 200 }} /> */}
            <View style={styles.section}>
                <LinkBox text="Our leadership" link="/discover/leadership" />
                <LinkBox text="Teams" link="/discover/teams" />
                <LinkBox text="Request prayer" link="/discover/prayer" />
                <LinkBox text="Share a testimony" link="" />
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
    mainHeading: {
        fontSize: 22,
        fontFamily: "SplineSans_400Regular",
        maxWidth: "75%",
        paddingTop: 32,
        paddingBottom: 16,
        letterSpacing: -0.6
    },
    text: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    }
});