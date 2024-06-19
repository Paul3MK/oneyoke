import { useState, useEffect } from "react"
import { Noop } from "react-hook-form"
import { StyleSheet, TextInput } from "react-native"

const BaseTextInput = ({ placeholder, lines=1, value, onChange, onBlur }: { placeholder: string, lines?: number, value?: any, onChange?: (...event:any[])=>void, onBlur?: Noop }) => {

    // const [value, setValue] = useState<string | undefined>()

    // useEffect(() => {
    //     console.log(value)
    // }, [value])

    const customStyle = StyleSheet.create({
        input: {
            backgroundColor: "#fff",
            borderColor: "#000",
            borderRadius: 4,
            borderWidth: 1,
            padding: 8,
            fontFamily: "SplineSans_400Regular",
            fontSize: 16,
            justifyContent: "flex-start"
        }
    })

    return (
        <TextInput style={customStyle.input} placeholder={placeholder} value={value} onChangeText={onChange} onBlur={onBlur} numberOfLines={lines} textAlignVertical={lines>1 ? "top" : "auto" } multiline={lines>1 ? true : false}/>
    )
}

export default BaseTextInput