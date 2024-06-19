import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function HomeStackLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
        </Stack>
    )
}