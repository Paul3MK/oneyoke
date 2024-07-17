import React, { ReactNode, useState, useCallback, useRef, useMemo, useSyncExternalStore } from "react";
import { View, Text } from "@/components/Themed";
import { Pressable, ScrollView, SectionList, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import CTA from "@/components/CTA/CTA";
import { Controller, useForm } from "react-hook-form";
import { useSectionStore } from "@/store/central";

export default function ManageOrderScreen() {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const snapPoints = useMemo(() => ["90%"], [])

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, [])
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index)
    }, [])

    // const [sections, setSections] = useState()

    const sections = useSectionStore(state=>state.sections)

    return (
        <BottomSheetModalProvider>
            <View style={style.container}>
                <View style={style.section}>
                    <Text>Sections go here</Text>
                    <OrderSection items={sections}/>
                </View>
                <View style={style.section}>
                    <Pressable style={style.createWrapper} onPress={handlePresentModalPress}>
                        <Text>Add a new section</Text>
                    </Pressable>
                </View>
                <Text>rfewfw</Text>
                <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges} snapPoints={snapPoints} style={style.sheet} backgroundStyle={{ backgroundColor: "#333" }}>
                    <BottomSheetView style={style.sheetView}>
                        <CreateSection />
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        height: 500
    },
    section: {
        paddingHorizontal: 16
    },
    createWrapper: {
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#444",
        paddingVertical: 16,
        paddingHorizontal: 8,
        justifyContent: "center"
    },
    sheet: {
        flex: 1,
    },
    sheetView: {
        flex: 1,
    }
})

const OrderSection = ({ items }: { items?: any[] }) => {

    const theme = useTheme()

    const customStyle = StyleSheet.create({
        card: {
            padding: 8,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#444"
        },
        cardHeading: {
            fontSize: 18,
            fontFamily: "SplineSans_400Regular",
            color: theme.dark ? "#fff" : "#000"
        }
    })

    return (
        <View style={customStyle.card}>
            {items!.map(item=><View>
                <Text>{item.sectionName}</Text>
            </View>)}
        </View>
    )
}

const OrderItem = ({title, subtitle, duration}) => {
    const customStyle = StyleSheet.create({
        wrapper: {
            padding: 8,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#444",
            gap: 4
        },
        title: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 18,
        },
        subtitle: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 16,
        },
        duration: {
            fontFamily: "SplineSansMono_400Regular",
            fontSize: 16
        }
    })

    return (
        <View style={customStyle.wrapper}>
            <Text style={customStyle.title}>{title}</Text>
            <Text style={customStyle.subtitle}>{subtitle}</Text>
            <Text style={customStyle.duration}>{duration}</Text>
        </View>
    )
}

const CreateSection = () => {

    const theme = useTheme()
    const addSection = useSectionStore(state=>state.addSection)

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [itemType, setItemType] = useState<string>("")
    const [selectedSong, setSelectedSong] = useState<null | string>(null)
    const [newItem, setNewItem] = useState<null | {}>(null)
    const [items, setItems] = useState<any[]>([])

    type SectionCreationType = {
        sectionName: string,
        sectionOrder: {}[]
    }

    const { register, handleSubmit, control } = useForm<SectionCreationType>({
        defaultValues: {
            sectionOrder: [],
            sectionName: ""
        }
    })

    const itemDropdownData = [
        { label: "Song", value: "song" },
        { label: "Other", value: "other" }
    ]

    const songData = [
        { songName: "Firm Foundation", defaultBpm: 98, defaultKey: "B" },
        { songName: "Adonai", defaultBpm: 80, defaultKey: "D" }
    ]

    const customStyle = StyleSheet.create({
        createSectionWrapper: {
            paddingHorizontal: 16,
            flex: 1
        },
        content: {
            flex: 1
        },
        sectionName: {
            fontSize: 22,
            fontFamily: "SplineSans_400Regular",
            color: theme.dark ? "#fff" : "#000",
            paddingTop: 8,
            paddingBottom: 8,
            marginBottom: 8,
            borderWidth: 1,
            borderBottomColor: "#444"
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        form: {},
        heading: {
            textTransform: "uppercase",
            fontSize: 14,
            fontFamily: "SplineSans_600SemiBold"
        },
        inputField: {
            paddingVertical: 8,
            gap: 4
        },
        dropdown: {
            borderBottomColor: "#444",
            borderBottomWidth: 1,
            color: theme.dark ? "#fff" : "#000"
        },
        textInput: {
            borderBottomColor: theme.dark ? "#444" : "#eee",
            borderBottomWidth: 1,
            paddingVertical: 4,
            color: theme.dark ? "#fff" : "#000"

        }
    })

    const onSubmit = (data) => {
        addSection({
            sectionName: data.sectionName,
            sectionContent: items
        })
        // console.log(data)
    }

    return (
        <View style={customStyle.createSectionWrapper}>
            <Controller
            control={control}
            name="sectionName"
            render={({field: {onChange}})=><TextInput style={customStyle.sectionName} autoFocus placeholder="Section name..." placeholderTextColor={"#444"} onChangeText ={onChange} />}
            />
            <ScrollView style={customStyle.content}>
                <View style={customStyle.header}>
                    <Text style={customStyle.heading}>Add item</Text>
                    <Controller
                    control={control}
                    name="sectionOrder"
                    render={({field: {onChange}})=><MaterialIcons name={isAdding ? "check" : "add"} size={24} color={"#fff"} onPress={isAdding ? () => { setIsAdding(false); setItems([...items, {...newItem, id: items.length + 1}]); return onChange([...items, {...newItem, id: items.length + 1}]) } : () => setIsAdding(true)} />}/>
                </View>
                {items.length > 0 &&
                    items.map(item => <OrderItem key={item.id} title={item.title} subtitle={item.subtitle} duration={item.duration}/>)
                }
                {isAdding &&
                    <View>
                        <View style={customStyle.inputField}>
                            <Text>Type</Text>
                            <Dropdown
                                data={itemDropdownData}
                                labelField={"label"}
                                valueField={"value"}
                                onChange={(item) => setItemType(item.value)}
                                style={customStyle.dropdown}
                                selectedTextStyle={{ color: theme.dark ? "#fff" : "#000", fontFamily: "SplineSans_400Regular" }}
                                containerStyle={{ backgroundColor: "#000" }}
                                itemTextStyle={{ color: "#fff" }}
                                activeColor="#444"
                                inputSearchStyle={{ color: "#fff" }}
                            />
                        </View>
                        {itemType == "song" &&

                            <View>
                                <Text>Song</Text>
                                <Dropdown
                                    data={songData}
                                    labelField={"songName"}
                                    valueField={"songName"}
                                    onChange={() => { }}
                                    style={customStyle.dropdown}
                                    selectedTextStyle={{ color: theme.dark ? "#fff" : "#000", fontFamily: "SplineSans_400Regular" }}
                                    containerStyle={{ backgroundColor: "#000" }}
                                    itemTextStyle={{ color: "#fff" }}
                                    activeColor="#444"
                                    inputSearchStyle={{ color: "#fff" }}
                                />
                            </View>}
                        {itemType == "other" &&
                            <View>
                                <View style={customStyle.inputField}>
                                    <Text>Title</Text>
                                    <TextInput placeholder="Title" style={customStyle.textInput} onChangeText={(text) => setNewItem({ ...newItem, title: text })} />
                                </View>
                                <View>
                                    <Text>Subtitle</Text>
                                    <TextInput placeholder="Subtitle" style={customStyle.textInput} onChangeText={(text) => setNewItem({ ...newItem, subtitle: text })} />
                                </View>
                                <View>
                                    <Text>Duration</Text>
                                    <TextInput keyboardType="number-pad" placeholder="Duration" style={customStyle.textInput} onChangeText={(text) => setNewItem({ ...newItem, duration: text })} />
                                </View>
                            </View>

                        }
                    </View>}
                <View>

                </View>
            </ScrollView>
            <CTA text="Add section" action={handleSubmit(onSubmit)} />
        </View>
    )
}

const SectionItemChips = () => {
    const customStyle = StyleSheet.create({
        wrapper: {},
        chip: {
            paddingVertical: 4,
            paddingHorizontal: 8
        },
        text: {
            fontSize: 14,
            fontFamily: "SplineSans_400Regular"
        }
    })
    return (
        <View style={customStyle.wrapper}>
            <Pressable style={customStyle.chip}>
                <Text style={customStyle.text}>Song</Text>
            </Pressable>
            <Pressable style={customStyle.chip}>
                <Text style={customStyle.text}>Other</Text>
            </Pressable>
        </View>
    )
}