import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CTA from "@/components/CTA/CTA";
import BaseTextInput from "@/components/Inputs/BaseTextInput";
import { Dropdown } from "react-native-element-dropdown"
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useRoleStore, useSectionStore } from "@/store/central";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreateServiceScreen() {

    interface ICreateServiceScreen {
        serviceDate: Date, // if this doesn't work, just parse it.
        serviceTime: Date,
        serviceLocation: string
    }

    const { control, handleSubmit, watch, getValues } = useForm<ICreateServiceScreen>({
        defaultValues: {
            serviceDate: new Date(),
            serviceTime: new Date()
        }
    })

    const roles = useRoleStore(state => state.roles)
    const order = useSectionStore(state=>state.sections)
    const createService = useMutation(api.worshipService.create)
    // console.log(watch("serviceDate"))
    // console.log(`from controller: ${watch("roles")}`)

    const theme = useTheme()

    const onSubmit = (data: ICreateServiceScreen) => {
        createService({
            date: data.serviceDate.toLocaleString(),
            time: data.serviceTime.toTimeString(),
            location: data.serviceLocation,
            roles: roles,
            order: order
        })
    }

    return (
        <View style={style.container}>
            <View style={style.body}>
                <View style={style.timeRow}>
                    <View style={style.timeRowUnit}>
                        <Text>Date</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TimeChip
                                    action={() => DateTimePickerAndroid.open({
                                        mode: "date",
                                        value: value,
                                        onChange: (event, date) => onChange(date)
                                    })}
                                    text={value.toDateString()} />
                            )}
                            name="serviceDate"
                        />
                    </View>
                    <Text>—</Text>
                    <View style={style.timeRowUnit}>
                        <Text>Time</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TimeChip
                                    action={() => DateTimePickerAndroid.open({
                                        mode: "time",
                                        value: value,
                                        onChange: (event, time) => onChange(time)
                                    })}
                                    text={value.toLocaleTimeString()} />
                            )}
                            name="serviceTime"
                        />
                    </View>
                </View>
                <View style={style.section}>
                    <Text>Location</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (<BaseTextInput placeholder="Specify location" value={value} onChange={onChange} onBlur={onBlur} />)}
                        name="serviceLocation"
                    />
                </View>
                <View style={style.section}>

                    {/* <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => <RolePicker onChange={onChange} value={value} />}
                        name="roles"
                    /> */}
                    <Pressable style={style.card} onPress={() => router.navigate("/services/specifyRoles")}>
                        <View style={style.cardContent}>
                            <Text style={style.cardHeading}>Roles</Text>
                            <View style={style.cardRecordsWrapper}>
                                {roles.map((role) => <Text>{role.roleName} — {role.member}</Text>)}
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" color={theme.dark ? "#fff" : "#000"} size={24} />
                    </Pressable>
                </View>
                <View style={style.section}>
                    <Pressable style={style.card} onPress={() => router.navigate("/services/manage-order")}>
                        <Text style={style.cardHeading}>Order</Text>
                        <MaterialIcons name="chevron-right" color={theme.dark ? "#fff" : "#000"} size={24} />
                    </Pressable>
                </View>
            </View>
            <View style={style.footer}>
                <CTA text={"Create service"} action={() => { }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1
    },
    header: {

    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    formBody: {

    },
    section: {
        paddingHorizontal: 16
    },
    text: {
        fontSize: 16,
        fontFamily: "SplineSans_400Regular"
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderColor: "#444",
        borderWidth: 1,
        borderRadius: 2
    },
    cardHeading: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 18
    },
    cardRecordsWrapper: {
        marginTop: 8
    },
    timeRow: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        paddingHorizontal: 16
    },
    timeRowUnit: {
        flex: 1
    }

})

const roleData = [
    { label: "Sound", value: "sound" },
    { label: "Vocals", value: "vocals" },
    { label: "Bass", value: "bass" }
]

const userData = [
    { label: "Adam E.", value: "001" },
    { label: "Jonathan W.", value: "002" },
    { label: "Norman H.", value: "003" }
]

const TimeChip = ({ text, action }) => {

    const customStyle = StyleSheet.create({
        chip: {
            borderRadius: 4,
            paddingVertical: 4,
            paddingHorizontal: 8,
            backgroundColor: "#444"
        },
        text: {
            fontSize: 14,
            fontFamily: "SplineSans_400Regular"
        }
    })

    return (
        <Pressable onPress={action} style={({ pressed }) => pressed ? [customStyle.chip, { opacity: 0.8 }] : customStyle.chip}>
            <Text style={customStyle.text}>{text}</Text>
        </Pressable>
    )
}