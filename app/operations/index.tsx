import { View, StyleSheet } from "react-native";
import {Text} from "@/components/Themed"
import { Link } from "expo-router";

export default function OperationsMenu() {
    return (
        <View style={styles.container}>
            <Link href="/operations/create-event">
                <Text style={styles.heading}>Create an event</Text>
            </Link>
            <Link href="/operations/make-announcement">
                <Text style={styles.heading}>Make an announcement</Text>
            </Link>
            <Link href="/operations/manage-team">
                <Text style={styles.heading}>Manage a team</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 22,
        letterSpacing: -0.3
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 32,
        gap: 24
    }
})