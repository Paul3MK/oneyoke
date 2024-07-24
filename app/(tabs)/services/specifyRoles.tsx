import { View, Text } from "@/components/Themed"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Dropdown } from "react-native-element-dropdown"
import { StyleSheet } from "react-native"
import CTA from "@/components/CTA/CTA"
import { useRoleStore } from "@/store/central"
import { MaterialIcons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"


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

export default function SpecifyRolesScreen() {

    interface IAddRole {
        roleName: string,
        member: string
    }

    const roles = useQuery(api.roles.get)!
    const users = useQuery(api.users.get)!

    const storedRoles = useRoleStore(state => state.roles)
    const add = useRoleStore(state => state.addRole)
    const remove = useRoleStore(state => state.removeRole)

    const { control, handleSubmit } = useForm<IAddRole>({
        defaultValues: {
            roleName: "",
            member: ""
        }
    })

    const onSubmit = () => add({
        roleName: role,
        members: user
    })


    const [role, setRole] = useState<string>("")
    const [user, setUser] = useState<string>("")

    const customStyle = StyleSheet.create({
        dropdown: {
            paddingVertical: 8,
            paddingHorizontal: 4,
            backgroundColor: "#fff"
        }
    })

    return (
        <View>
            <View>
                <Controller
                    control={control}
                    name="roleName"
                    render={({ field: { onChange, onBlur, value } }) =>
                        <Dropdown
                            data={roles}
                            valueField={"_id"}
                            labelField={"roleName"}
                            onChange={(item) => setRole(item.roleName)}
                            style={customStyle.dropdown}
                        />}
                />
                <Controller
                    control={control}
                    name="member"
                    render={() => <Dropdown
                        data={users}
                        valueField={"_id"}
                        labelField={"firstName"}
                        onChange={(item) => setUser(`${item.firstName} ${item.lastName}`)}
                        style={customStyle.dropdown}
                    />}
                />
            </View>
            <CTA text="Add role" action={handleSubmit(onSubmit)} />

            <View>
                {storedRoles.map(role => (<RoleRecord key={role.roleName} roleName={role.roleName} member={role.member} />))}
            </View>
        </View>
    )
}

const RoleRecord = ({ roleName, members }: { roleName: string, members: string[] }) => {

    const theme = useTheme()

    const remove = useRoleStore(state => state.removeRole)

    const customStyle = StyleSheet.create({
        wrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8
        },
        text: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 14
        }
    })

    return (
        <View style={customStyle.wrapper}>
            <Text style={customStyle.text}>{roleName} - {members}</Text>
            <MaterialIcons name="remove-circle-outline" size={24} color={theme.dark ? "#fff" : "#000"} onPress={() => remove(members, roleName)} />
        </View>
    )
}