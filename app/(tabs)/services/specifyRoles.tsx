import { View, Text } from "@/components/Themed"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Dropdown } from "react-native-element-dropdown"
import { StyleSheet } from "react-native"
import CTA from "@/components/CTA/CTA"
import { useRoleStore } from "@/store/central"
import { MaterialIcons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"


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

    const { control, handleSubmit } = useForm<IAddRole>({
        defaultValues: {
            roleName: "",
            member: ""
        }
    })

    const onSubmit = () => add({
        roleName: role,
        member: user
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

    const roles = useRoleStore(state => state.roles)
    const add = useRoleStore(state => state.addRole)
    const remove = useRoleStore(state => state.removeRole)

    return (
        <View>
            <Controller
                control={control}
                name="roleName"
                render={({ field: { onChange, onBlur, value } }) => 
                <Dropdown
                    data={roleData}
                    valueField={"value"}
                    labelField={"label"}
                    onChange={(item)=>setRole(item.label)}
                    style={customStyle.dropdown}
                />}
            />
            <Controller 
            control={control}
            name="member"
            render={()=><Dropdown
                data={userData}
                valueField={"value"}
                labelField={"label"}
                onChange={(item) => setUser(item.label)}
                style={customStyle.dropdown}
            />}
            />
            <CTA text="Add role" action={handleSubmit(onSubmit)} />

            <View>
                {roles.map(role => (<RoleRecord roleName={role.roleName} member={role.member}/>))}
            </View>
        </View>
    )
}

const RoleRecord = ({roleName, member}: {roleName: string, member: string}) => {

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

    return(
        <View style={customStyle.wrapper}>
            <Text style={customStyle.text}>{roleName} - {member}</Text>
            <MaterialIcons name="delete" size={24} color={theme.dark ? "#fff" : "#000"} onPress={()=>remove(member, roleName)}/>
        </View>
    )
}