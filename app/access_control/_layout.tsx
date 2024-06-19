import React from "react";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AccessControlLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle: ()=><Text></Text>}}/>
        </Stack>
    )
}