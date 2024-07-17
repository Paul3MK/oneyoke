import { View, StyleSheet, Pressable, ScrollView } from "react-native"
import { Text } from "@/components/Themed"
import React, { useEffect, useRef, useState } from "react"
import { Audio } from "expo-av"
import { MaterialIcons } from "@expo/vector-icons"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useLocalSearchParams } from "expo-router"
import { SoundObject } from "expo-av/build/Audio"

export default function TeamDetails() {

    const local = useLocalSearchParams<{ teamId: string }>()

    const [details, setDetails] = useState<Array<any> | undefined>()

    const _teamDetails = useQuery(api.teamEvents.get)
    const teams = useQuery(api.teams.get)

    const teamDetails = _teamDetails?.filter(details => details.teams?.find((team) => team == local.teamId))

    console.log(_teamDetails)
    console.log(local.teamId)

    useEffect(() => {
        setDetails(teamDetails)
    }, [_teamDetails])

    return (
        <View style={styles.container}>
            <Text>{teams?.filter(team => team._id == local.teamId)[0].name}</Text>
            <ScrollView>
                {details?.map(detail => <TeamDetailsTable key={detail._id} data={detail} />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    }
})


const TeamDetailsTable = ({ data }) => {

    const customStyles = StyleSheet.create({
        section: {
            marginBottom: 24
        },
        horizontalSection: {
            flexDirection: "row",
            gap: 16
        }
    })

    return (
        <View>
            <Text>{data.date}</Text>
            <View style={customStyles.section}>
                <TeamDetailsRecord label="Time" values={data.time} end={false} multi={false} />
                <TeamDetailsRecord label="Place" values={data.location} end={true} multi={false} />
            </View>
            <View style={customStyles.section}>
                <Text>People</Text>
                {data.roles.map((r) => {
                    if (r.members.length > 1) {
                        return <TeamDetailsRecord key={r.roleName} label={r.roleName} values={r.members} end={false} multi={true} />
                    } else {
                        return <TeamDetailsRecord key={r.roleName} label={r.role} values={r.members} end={false} multi={false} />
                    }

                }
                )}
            </View>
            <View style={customStyles.section}>
                <Text>Setlist</Text>
                {data.setList.map((s) => <SetlistDetailsRecord key={s.songName} songName={s.songName} songKey={s.key} bpm={s.bpm} />)}
            </View>
            <View style={[customStyles.section, customStyles.horizontalSection]}>
                {data.audio.map(audio => <AudioCard key={audio.audioName} title={audio.audioName} link={audio.uri} />)}
            </View>
        </View>
    )
}

const TeamDetailsRecord = ({ label, values, end, multi }) => {
    const customStyles = StyleSheet.create({
        record: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#eee",
            borderBottomWidth: 1
        },
        text: {
            textAlign: "right"
        }
    })
    if (multi) {
        return (
            <View style={customStyles.record}>
                <Text style={customStyles.text}>{label}</Text>
                <View>
                    {values.map((value: string) => <Text style={customStyles.text}>{value}</Text>)}
                </View>
            </View>
        )
    } else {
        return (
            <View style={customStyles.record}>
                <Text style={customStyles.text}>{label}</Text>
                <View>
                    <Text style={customStyles.text}>{values}</Text>
                </View>
            </View>
        )
    }
}

const SetlistDetailsRecord = ({ songName, bpm, songKey }) => {
    const customStyles = StyleSheet.create({
        record: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#eee",
            borderBottomWidth: 1
        },
        text: {
            textAlign: "right"
        },
        songInfoGroup: {
            width: 80,
            flexDirection: "row",
            justifyContent: "space-between"
        }
    })

    return (
        <View style={customStyles.record}>
            <Text style={customStyles.text}>{songName}</Text>
            <View style={customStyles.songInfoGroup}>
                <Text style={customStyles.text}>{songKey}</Text>
                <Text style={customStyles.text}>{bpm}bpm</Text>
            </View>
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