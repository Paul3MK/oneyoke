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

export default function CreateServiceScreen() {

    interface ICreateServiceScreen {
        serviceDate: Date, // if this doesn't work, just parse it.
        serviceTime: Date,
        serviceLocation: string,
        roles: [],
        order: [],
        songList: [],
        files: []
    }

    const { control, handleSubmit, watch, getValues } = useForm<ICreateServiceScreen>({
        defaultValues: {
            serviceDate: new Date(),
            serviceTime: new Date()
        }
    })

    console.log(watch("serviceDate"))
    console.log(`from controller: ${watch("roles")}`)

    const theme = useTheme()

    return (
        <ScrollView>
            <Text>Create service</Text>
            <View>
                <View>
                    <Text>Date</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CTA
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
                <View>
                    <Text>Time</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CTA
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
                <View>
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
                        <Text style={style.text}>Manage roles</Text>
                        <MaterialIcons name="chevron-right" color={theme.dark ? "#fff" : "#000"} size={24} />
                    </Pressable>
                </View>
                <View style={style.section}>
                    <Pressable style={style.card} onPress={() => router.navigate("/services/manage-order")}>
                        <Text style={style.text}>Manage order</Text>
                        <MaterialIcons name="chevron-right" color={theme.dark ? "#fff" : "#000"} size={24} />
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {

    },
    body: {

    },
    header: {

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
        paddingVertical: 24,
        paddingHorizontal: 8,
        borderColor: "#444",
        borderWidth: 1,
        borderRadius: 2
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

const RolePicker = ({ onChange, value }) => {

    const [role, setRole] = useState<null | string>(null)
    const [user, setUser] = useState<null | string>(null)
    const [masterRoles, setMasterRoles] = useState<{}[]>([])
    const customStyle = StyleSheet.create({
        dropdown: {
            paddingVertical: 8,
            paddingHorizontal: 4,
            backgroundColor: "#fff"
        }
    })
    const roles = []
    return (
        <View>
            <View>
                {masterRoles.map(role => <Text>{role.role} - {role.user}</Text>)}
            </View>
            <Dropdown
                data={roleData}
                valueField={"value"}
                labelField={"label"}
                // value={role}
                onChange={(item) => setRole(item.value)}
                style={customStyle.dropdown}
            />
            <Dropdown
                data={userData}
                valueField={"value"}
                labelField={"label"}
                // value={user}
                onChange={(item) => setUser(item.value)}
                style={customStyle.dropdown}
            />
            <CTA text="Add role" action={() => setMasterRoles([...masterRoles, { role: role, user: user }])} />
        </View>
    )
}

const ServiceOrderForm = () => {
    const [serviceOrder, setServiceOrder] = useState<{ section: string | null, index: number }[]>([])
    const [currentSection, setCurrentSection] = useState<string | null>(null)
    return (
        <View>
            <View>
                {serviceOrder.map(service => (
                    <View>
                        <Text>{service.section}</Text>
                        <ServiceItemForm />
                    </View>
                ))}
            </View>
            <BaseTextInput onChange={setCurrentSection} placeholder="section name" />
            <CTA action={() => setServiceOrder([...serviceOrder, { section: currentSection, index: serviceOrder.length }])} text="Add section" />
        </View>
    )
}

const ServiceItemForm = () => {
    return (
        <View>
            <CTA text="Add item to section" action={() => { }} />
        </View>
    )
}