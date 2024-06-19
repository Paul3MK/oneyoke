import { Image, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import CTA from '@/components/CTA/CTA';
import { MaterialIcons } from '@expo/vector-icons';

export default function DiscoverLeadershipScreen() {


    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.heading}>Our leadership</Text>
                <View style={styles.introductionWrapper}>
                    <Text style={styles.copy}>Find out more about our story, leadership and our teams. Connect with us and get plugged into church life.</Text>
                </View>
            </View>
            <View style={[styles.section, styles.twoColumn]}>
                <ProfileBox
                    imageLink='https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    profileName='Adam Brannon'
                    position='Founder'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at semper quam. Vestibulum velit nulla, volutpat vitae nulla ac, auctor vestibulum nunc.'
                />
                <ProfileBox
                    imageLink='https://images.unsplash.com/photo-1560265036-021b3652b490?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    profileName='Brian & Cathy Jopley'
                    position='Senior Pastors'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at semper quam. Vestibulum velit nulla, volutpat vitae nulla ac, auctor vestibulum nunc.'
                />
            </View>
            <View style={[styles.section, styles.twoColumn]}>
                <ProfileBox
                    imageLink='https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww'
                    profileName='Derrick Smith'
                    position='Youth Pastor'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at semper quam. Vestibulum velit nulla, volutpat vitae nulla ac, auctor vestibulum nunc.'
                />
                <ProfileBox
                    imageLink='https://images.unsplash.com/photo-1457367756802-2c6127b8ad11?q=80&w=1449&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    profileName='Emmanuel & Nadine Mura'
                    position='Worship Pastors'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at semper quam. Vestibulum velit nulla, volutpat vitae nulla ac, auctor vestibulum nunc.'
                />
            </View>
            {/* <View style={styles.section}>
                <Text style={styles.heading}>Contribute</Text>
            </View> */}
        </ScrollView>
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
    heading: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 22,
        marginVertical: 16,
        letterSpacing: -0.6
    },
    copy: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    },
    introductionWrapper: {
        paddingVertical: 8
    },
    twoColumn: {
        flexDirection: "row",
        gap: 16
    }
});

const ProfileBox = ({ imageLink, profileName, position, description }: { imageLink: string, profileName: string, position: string, description: string }) => {

    const customStyles = StyleSheet.create({
        image: {
            borderRadius: 4,
            marginBottom: 16,
            height: 160,
            width: "100%",
            
        },
        subheading: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 16
        },
        tag: {
            fontFamily: "SplineSans_600SemiBold",
            fontSize: 12
        },
        copy: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 14
        },
        profileWrapper: {
            marginVertical: 16,
            flex: 1
        },
        textWrapper: {
            gap: 8
        }
    })

    return (
        <View style={customStyles.profileWrapper}>
            <Image style={customStyles.image} source={{ uri: imageLink }} resizeMode="cover"/>
            <View style={customStyles.textWrapper}>
                <Text style={customStyles.subheading}>{profileName}</Text>
                <Text style={customStyles.tag}>{position}</Text>
                {/* <Text style={customStyles.copy}>{description}</Text> */}
            </View>
        </View>
    )
}