import { StyleSheet, View, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Button } from "react-native"
import { Text } from "@/components/Themed"
import { Controller, useForm } from "react-hook-form"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import NavigateButton from "@/components/CTA/NavigateButton"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import CTA from "@/components/CTA/CTA"
import { router } from "expo-router"

export default function CreateEventScreen() {

    type EventInputs = {
        eventName: string,
        eventDate: Date,
        eventStartTime: Date,
        eventEndTime: Date,
        eventLocation: string,
        eventLead: string,
        teams: Array<string>,
        image: string,
        eventDescription: string,
        eventDetails: string,
    }

    const { control, handleSubmit, formState: {errors}, reset } = useForm<EventInputs>({
        defaultValues: {
            eventDate: new Date(),
            eventStartTime: new Date(),
            eventEndTime: new Date(),
        }
    })

    const createEvent = useMutation(api.events.create)

    const onSubmit = async (data:EventInputs) => {
        await createEvent({
            name: data.eventName,
            details: data.eventDetails,
            startTime: data.eventStartTime.toLocaleTimeString(),
            endTime: data.eventEndTime.toLocaleTimeString(),
            date: data.eventDate.toLocaleDateString(),
            image: data.image,
            lead: data.eventLead,
            location: data.eventLocation,
            description: data.eventDescription
        })
        // console.log("data")
        reset()
        router.back()
    }

    console.log(errors)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color: "#fff" }}>Create event</Text>
            </View>
            <KeyboardAvoidingView style={styles.contentWrapper}>
                <ScrollView>

                <View>
                    <Text>Event name</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} style={styles.input} />
                        }
                        name="eventName"
                    />
                </View>
                <View>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <DateSelect value={value} onChange={onChange} />
                        }
                        name="eventDate"
                    />
                </View>
                <View>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TimeSelect value={value} onChange={onChange} />
                        }
                        name="eventStartTime"
                    />
                </View>
                <View>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TimeSelect value={value} onChange={onChange} />
                        }
                        name="eventEndTime"
                    />
                </View>
                <View>
                    <Text>Location</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TextInput value={value} onChangeText={onChange} onBlur={onBlur} style={styles.input} />
                        }
                        name="eventLocation"
                    />
                </View>
                <View>
                    <Text>Event Lead</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TextInput value={value} onChangeText={onChange} onBlur={onBlur} style={styles.input} />
                        }
                        name="eventLead"
                    />
                </View>
                <View>
                    <Text>Event details</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TextInput value={value} onChangeText={onChange} onBlur={onBlur} style={styles.input} />
                        }
                        name="eventDetails"
                    />
                </View>
                <View>
                    <Text>Event description</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TextInput value={value} onChangeText={onChange} onBlur={onBlur} style={styles.input} multiline={true} numberOfLines={5} />
                        }
                        name="eventDescription"
                    />
                </View>
                <View>
                    <Text>Event image</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <TextInput value={value} onChangeText={onChange} onBlur={onBlur} style={styles.input} />
                        }
                        name="image"
                    />
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View>
                {/* <Button onPress={handleSubmit(onSubmit)} title="Heya"/> */}
                <CTA text="Create event" action={handleSubmit(onSubmit)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: "#fff",
        color: "#fff"
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 16
    },
    header: {
        paddingHorizontal: 16
    }
})

const DateSelect = ({ value, onChange }: { value: Date, onChange: (...event: any[]) => void }) => {
    console.log(`Date value: ${JSON.stringify(value)}`)

    const customStyles = StyleSheet.create({
        picker: {
            backgroundColor: "#66f",
            height: "auto",
            width: 100
        }
    })

    function showDatePicker() {
        DateTimePickerAndroid.open({
            value: value,
            onChange: (event, value) => onChange(value),
            mode: "date",
            is24Hour: true
        })
    }

    return (
        <Pressable onPress={showDatePicker} style={customStyles.picker}>
            {value && <Text>{value?.toLocaleDateString()}</Text>}
        </Pressable>
    )
}

const TimeSelect = ({ value, onChange }: { value: Date, onChange: (...event: any[]) => void }) => {

    const customStyles = StyleSheet.create({
        picker: {
            backgroundColor: "#66f",
            height: "auto",
            width: 100
        }
    })

    function showTimePicker() {
        DateTimePickerAndroid.open({
            value: value,
            onChange: (event, value) => onChange(value),
            mode: "time",
            is24Hour: true
        })
    }

    return (
        <Pressable onPress={showTimePicker} style={customStyles.picker}>
            {value && <Text>{value?.toTimeString()}</Text>}
        </Pressable>
    )
}