import { View, Text } from "@/components/Themed";
import NavigateButton from "@/components/CTA/NavigateButton";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TeamsModal() {

    const local = useLocalSearchParams<{ team: string }>()


    const teams = useQuery(api.teams.get)!
    const users = useQuery(api.users.get)
    const [teamData, setTeamData] = useState<any>()

    useEffect(() => {
        setTeamData(teams.filter((team) => team._id == local.team)[0])
    }, [local])

    if (!teamData) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: teamData.displayImage }} style={styles.header}>
                    <View style={styles.headerWrapper}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.headerText}>{teamData.name}</Text>
                        </View>
                        <Text>Led by {resolveUserNameFromId(teamData.lead, users)}</Text>
                    </View>
                </ImageBackground>
                <ScrollView style={styles.contentWrapper}>
                    <View style={styles.section}>
                        <Text style={styles.text}>{teamData.description}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.secondaryHeading}>Roles</Text>
                        <View style={styles.roleListWrapper}>
                            {teamData.roles.map((role) =>
                                <View key={role.roleName} style={styles.roleWrapper}>
                                    <Text style={styles.text}>{role.roleName}</Text>
                                    <Text style={styles.text}>{role.roleDescription}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <NavigateButton text="Sign up" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    secondaryHeading: {
        fontFamily: "SplineSans_600SemiBold",
        fontSize: 18,
        paddingBottom: 16
    },
    text: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    },
    roleListWrapper: {
        gap: 8
    }
})


function resolveUserNameFromId(id: string, users: Array<any>) {
    const retrievedUser = users?.filter((user) => user._id == id)

    if (retrievedUser) {
        return `${retrievedUser[0].firstName} ${retrievedUser[0].lastName}`
    }
}