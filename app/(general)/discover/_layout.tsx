import { Stack } from "expo-router";

export default function DiscoverLayout(){
    return(
        <Stack screenOptions={{headerTitle: ()=>(<></>)}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="leadership"/>
            <Stack.Screen name="teams"/>
        </Stack>
    )
}