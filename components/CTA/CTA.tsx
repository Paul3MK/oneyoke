import React from "react"
import { Pressable } from "react-native"
import { Text, View } from '@/components/Themed';
import { router } from "expo-router"
import { StyleSheet } from "react-native";

const CTA = ({action, text}: {action: ()=>void, text: string | number}): React.JSX.Element => {

    const customStyles = StyleSheet.create({
      CTA: {
        paddingVertical: 12,
        fontSize: 16,
        width: '100%',
        height: "auto",
        backgroundColor: '#6f6f6f',
        alignItems: "center"
      },
      CTAPressed: {
        paddingVertical: 12,
        fontSize: 16,
        width: '100%',
        backgroundColor: '#cccccc',
        alignItems: "center"
      },
    })
  
    return (
        <Pressable onPress={action} style={({ pressed }) => pressed ? customStyles.CTAPressed : customStyles.CTA}>
          <Text style={{ fontFamily: "SplineSans_400Regular", fontSize: 16 }}>{text}</Text>
        </Pressable>
    )
  }

export default CTA