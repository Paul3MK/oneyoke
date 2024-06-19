import { Image, ImageBackground, ImageSourcePropType, Pressable, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import CTA from '@/components/CTA/CTA';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function DiscoverTeamsScreen() {

    const teams = useQuery(api.teams.get)!

    const [teamsList, setTeamsList] = useState<any>()

    useEffect(()=>{
        setTeamsList(teams)
    }, [teams])


    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} resizeMode='cover' style={{ height: 200, width: "100%", borderRadius: 4 }}>
                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>Teams</Text>
                </View>
            </ImageBackground>
            <View style={[styles.section, styles.introductorySection]}>
                <Text style={styles.copy}>Our church is made up of a fantastic group of people who come together to  make a positive impact in the community.</Text>
            </View>
            {teamsList &&
                teamsList.map((team) => (
                    <View key={team.name} style={styles.section}>
                        <TeamsBox
                            imageLink={team.displayImage}
                            teamName={team.name}
                            teamId={team._id}
                        />
                    </View>
                )
                )
            }
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
        fontFamily: "SplineSans_600SemiBold",
        fontSize: 24,
        marginVertical: 16
    },
    copy: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    },
    headingWrapper: {
        backgroundColor: "#00000066",
        paddingHorizontal: 16,
        height: "100%",
        justifyContent: "flex-end"
    },
    introductorySection: {
        paddingVertical: 16
    }
});

const TeamsBox = ({ imageLink, teamName, teamId }: { imageLink: string, teamName: string, teamId: string }) => {

    const customStyles = StyleSheet.create({
        image: {
            borderRadius: 4,
            marginBottom: 16,
            height: 120,
            width: 180
        },
        subheading: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 16,

        },
        teamBoxWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            alignItems: "center"
        }
    })

    return (
        <Pressable style={customStyles.teamBoxWrapper} onPress={()=>router.navigate(`/team?team=${teamId}`)}>
            <Text style={{ ...customStyles.subheading, ...styles.copy }}>{teamName}</Text>
            <Image style={customStyles.image} source={{ uri: imageLink }} resizeMode='cover' />
        </Pressable>
    )
}