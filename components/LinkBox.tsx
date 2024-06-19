import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { useColorScheme } from "react-native";

const LinkBox = ({ text, link, target="page", href }: { text: string, link: string, target?: string, href?:boolean}) => {

    const colorScheme = useColorScheme();

    const customStyles = StyleSheet.create({
        container: {
            gap: 16,
            paddingVertical: 16,
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center"
        },
        linkIconWrapper: {
            borderRadius: 64,
            padding: 6,
            backgroundColor: colorScheme === "light" ? "#000" : "#fff"
        },
        text: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 16
        }
    })

        return (
            <Pressable onPress={() => router.navigate(link)}>
                <View style={customStyles.container}>
                    <View style={customStyles.linkIconWrapper}>
                        <MaterialIcons name={target == "page" ? 'arrow-forward' : "arrow-outward"} size={24} color={colorScheme === "light" ? "#fff" : "#000" }/>
                    </View>
                    <Text style={customStyles.text}>{text}</Text>
                </View>
    
            </Pressable>
        )
}

export default LinkBox