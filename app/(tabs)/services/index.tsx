import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Link, router, useLocalSearchParams } from "expo-router";
import CTA from "@/components/CTA/CTA";

export default function ServicesHomeScreen(){

    const services = useQuery(api.worshipService.get)!

    const [loadedServices, setLoadedServices] = useState<undefined | any>()

    useEffect(()=>{
        setLoadedServices(services)
    }, [services])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.h2}>Services</Text>
            </View>
            <View style={styles.section}>
                {loadedServices?.map(service=>(<ServiceCard key={service._id} service={service}/>))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: "100%"
    },
    section: {
        paddingHorizontal: 16,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    h2: {
        fontSize: 22,
        fontFamily: "SplineSans_400Regular"
    }
})

const ServiceCard = ({service}) => {

    const customStyle = StyleSheet.create({
        itemCard: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff"
        }
    })

    return (
    <Link href={`/(tabs)/services/service-details?serviceId=${service._id}`}>
        <View style={customStyle.itemCard}>
            <Text>Service on {service.date} in {service.location}</Text>
        </View>
    </Link>
    )
}