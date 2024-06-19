import React from "react";
import { Stack } from "expo-router";

export default function OperationsMenuLayout(){
    return (
        <Stack>
            <Stack.Screen name="index"/>
            <Stack.Screen name="create-event"/>
            <Stack.Screen name="make-announcement"/>
            <Stack.Screen name="manage-team"/>
        </Stack>
    )
}