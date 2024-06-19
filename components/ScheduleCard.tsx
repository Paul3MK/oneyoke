import { StyleSheet, Pressable, ImageBackground } from "react-native"
import { View, Text } from "./Themed"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

const ScheduleCard = ({ time, title, details, link, image }) => {

    const customStyles = StyleSheet.create({
        circle: {
            borderRadius: 480,
            padding: 12,
        },
        card: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "#fff",
            borderRadius: 4,
            maxHeight: 120,
            overflow: "hidden"
        },
        title: {
            fontFamily: "SplineSans_600SemiBold",
            fontSize: 18
        },
        text: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 14
        },
        cardTextWrapper: {
            backgroundColor: "#ffffff00",
            paddingVertical: 8,
            flex: 4,
            gap: 6
        },
        linkIconWrapper: {
            flex: 1,
            alignItems: "center",
            height: "100%",
            backgroundColor: "#00000000"
        },
        backgroundImage: {
            paddingHorizontal: 8,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        backgroundOverlay: {
            position: "absolute",
            height: "100%",
            width: "120%", //weird
            backgroundColor: "rgba(0,0,0,0.6)"
        }
    })

    return (
        <Pressable
            onPress={() => {
                router.setParams({ ev: link })
                router.navigate(`/event?ev=${link}`)
            }}
            style={customStyles.card}
        >
            <ImageBackground source={{ uri: image }} style={customStyles.backgroundImage} resizeMode="cover">
                <View style={customStyles.backgroundOverlay}/>
                <View style={customStyles.cardTextWrapper}>
                    <Text style={customStyles.text}>{`${new Date(time)}`}</Text>
                    <Text style={customStyles.title}>{title}</Text>
                    <Text style={customStyles.text}>{details}</Text>
                </View>
                <View style={customStyles.linkIconWrapper}>
                    <View style={customStyles.circle}>
                        <MaterialIcons name="arrow-outward" color="#fff" />
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

export default ScheduleCard