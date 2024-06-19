import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import BaseTextInput from "@/components/Inputs/BaseTextInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import CTA from "@/components/CTA/CTA";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { router } from "expo-router";


export default function PrayerRequestScreen() {

    type prayerRequestFormData = {
        firstName: string,
        lastName: string,
        emailAddress: string,
        phoneNumber: string,
        category: "healing" | "salvation" | "marriage" | "finance" | "health" | "other" | "deliverance",
        details: string
    }

    const createPrayerRequest = useMutation(api.prayerRequests.create)

    const { control, handleSubmit } = useForm<prayerRequestFormData>();

    const [selectedValue, setSelectedValue] = useState<string>()

    const onSubmit = (data: prayerRequestFormData) => {
        createPrayerRequest({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        phoneNumber: data.phoneNumber,
        details: data.details,
        category: data.category
    })
    setTimeout(()=>{
        router.back()
    }, 1000)
}    

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" enabled>

                <View style={styles.body}>

                    <View style={styles.header}>
                        <Text style={styles.h1}>Request prayer</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.text}></Text>
                    </View>
                    <View style={[styles.formSection, styles.formTwoColumn]}>
                        <View style={[styles.inputField, styles.rowField]}>
                            <Text style={styles.label}>First name</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <BaseTextInput placeholder="First name" onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="firstName"
                            />
                        </View>
                        <View style={[styles.inputField, styles.rowField]}>
                            <Text style={styles.label}>Last name</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <BaseTextInput placeholder="Last name" onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="lastName"
                            />
                        </View>
                    </View>
                    <View style={styles.formSection}>
                        <View style={styles.inputField}>
                            <Text style={styles.label}>Email address</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <BaseTextInput placeholder="Email address" onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="emailAddress"
                            />
                        </View>
                    </View>
                    <View style={styles.formSection}>
                        <View style={styles.inputField}>
                            <Text style={styles.label}>Phone number</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <BaseTextInput placeholder="Phone number" onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="phoneNumber"
                            />
                        </View>
                    </View>
                    <View style={styles.formSection}>
                        <View style={styles.inputField}>
                            <Text style={styles.label}>What are you praying for?</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={value}
                                        onValueChange={onChange}
                                    >
                                        <Picker.Item label="Healing" value="healing" />
                                        <Picker.Item label="Health" value="health" />
                                        <Picker.Item label="Deliverance" value="deliverance" />
                                        <Picker.Item label="Finance" value="finance" />
                                        <Picker.Item label="Marriage" value="marriage" />
                                        <Picker.Item label="Salvation" value="salvation" />
                                        <Picker.Item label="Other" value="other" />
                                    </Picker>

                                )}
                                name="category"
                                />
                    </View>
                    </View>
                    <View style={styles.formSection}>
                        <View style={styles.inputField}>
                            <Text style={styles.label}>Prayer request details</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <BaseTextInput placeholder="Give more details here..." lines={5} onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="details"
                            />
                        </View>
                    </View>
                    <View style={styles.formSection}>
                        <CTA text="Submit" action={handleSubmit(onSubmit)} />

                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 32,
        paddingBottom: 16,
        paddingHorizontal: 16
    },
    h1: {
        fontSize: 22,
        fontFamily: "SplineSans_400Regular",
    },
    section: {

    },
    text: {

    },
    formSection: {
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    formTwoColumn: {
        gap: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputField: {
        gap: 4
    },
    rowField: {
        flex: 1
    },
    label: {
        fontFamily: "SplineSans_700Bold",
        fontSize: 14,
        // textTransform: "uppercase"
    },
    picker: {
        backgroundColor: "#fff",
    },
    pickerItem: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    },
    body: {
        flex: 1
    },
    footer: {
        height: 50,
        paddingHorizontal: 16
    }
})