import { Text, View } from "@/components/Themed"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ImageBackground, Pressable, StyleSheet } from "react-native"

import { get } from "@/convex/events"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import ScheduleCard from "@/components/ScheduleCard"

export default function ScheduleScreen() {

    const events = useQuery(api.events.get)

    const [schedule, setSchedule] = useState<Array<undefined> | any>()

    useEffect(() => {
        setSchedule(events)
    }, [events])

    if(typeof schedule != "undefined"){

        console.log(`${schedule[0].date}`)
    }

    return (
        <View style={styles.container}>
            <Text>Schedule</Text>
            <View style={styles.scheduleWrapper}>
                {schedule?.map(event => <ScheduleCard key={event.name} time={event.date} title={event.name} details={event.description} link={event._id} image={event.image} />)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    scheduleWrapper: {
        gap: 16
    }
})