import { Stack, router } from "expo-router";
import React, { ReactElement, ReactNode } from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function ServicesLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: true, header: () => <CustomHeader type="create" createAction={() => router.navigate("/services/new-service")} /> }} />
            <Stack.Screen name="service-details" options={{ headerShown: true, header: () => <CustomHeader type="back" backAction={() => router.back()} /> }} />
            <Stack.Screen name="file-upload" options={{ presentation: "modal", headerShown: true, headerTitle: "Add file to service" }} />
            <Stack.Screen name="new-service" options={{ presentation: "modal", headerShown: true }} />
            <Stack.Screen name="manage-order" options={{headerShown: true}}/>
        </Stack>
    )
}

const CustomHeader = ({ type, createAction, backAction, children }: { type: string, createAction?: () => void, backAction?: () => void, children?: ReactNode[] }) => {

    const theme = useTheme()

    const headerStyle = StyleSheet.create({
        headerContainer: {
            paddingHorizontal: 8,
            paddingTop: 24,
            paddingBottom: 4,
            borderColor: theme.dark ? "#444" : "#ddd",
            borderBottomWidth: 1
        },
        contentWrapper: {
            flexDirection: "row",
            justifyContent: type=="back" ? "flex-start" : "flex-end",
        },
        heading: {

        },
        addIcon: {
            padding: 8,
            // borderColor: "#0f0",
            // borderWidth: 1
        },
        addIconPressed: {
            padding: 8,
            backgroundColor: "#333",
            borderRadius: 64
        }
    })

    return (
        <View style={headerStyle.headerContainer}>
            <View style={headerStyle.contentWrapper}>
                {type == "create" &&
                    <Pressable style={({ pressed }) => pressed ? headerStyle.addIconPressed : headerStyle.addIcon} onPress={createAction}>
                        <MaterialIcons name="add" color="#fff" size={24} />
                    </Pressable>
                }
                {type == "back" &&
                    <Pressable style={({ pressed }) => pressed ? headerStyle.addIconPressed : headerStyle.addIcon} onPress={backAction}>
                        <MaterialIcons name="arrow-back" color="#fff" size={24} />
                    </Pressable>
                }
                {type == "full" &&
                    <View>
                        <Pressable style={({ pressed }) => pressed ? headerStyle.addIconPressed : headerStyle.addIcon} onPress={backAction}>
                            <MaterialIcons name="arrow-back" color="#fff" size={24} />
                        </Pressable>
                        <Pressable style={({ pressed }) => pressed ? headerStyle.addIconPressed : headerStyle.addIcon} onPress={createAction}>
                            <MaterialIcons name="create" color="#fff" size={24} />
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    )
}