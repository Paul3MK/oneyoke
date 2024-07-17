import LinkBox from "@/components/LinkBox";
import { Text, View } from "@/components/Themed";
import React from "react";
import { StyleSheet, Pressable, ScrollView } from "react-native";

export default function GiveScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={[styles.section, styles.paddingTop24]}>
                <Text style={styles.mainHeading}>Give</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Your generosity is positively changing lives in our church, community, and around the world. Apostle Paul reminds us in 2 Corinthians 9:6-8 that whoever sows sparingly will reap sparingly, and whoever sows generously will reap generously. Thank you for continuing to help others see the generous nature of the Body of Christ through your giving.</Text>
            </View>
            <View style={styles.section}>
                <LinkBox link="https://www.paypal.com/paypalme/kingdomembassyinc" text="PayPal" target="modal"/>
                <LinkBox link="https://cash.app/$KingdomEmbassyInc" text="Cash App" target="modal" />
                <LinkBox link="https://donate.almsbucket.com/donate?campaign=givekingdomembassy" text="Debit/Credit card" target="modal" />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeading}>Partner with us</Text>
                <Text style={styles.text}>With the help of our Partners, we seek to further God’s kingdom by making a difference in the lives of His people all over the world. Let’s work together to save the lost, help the hurting, and spread the Gospel in the mighty name of Jesus Christ.</Text>
            </View>
            <View style={[styles.givingGrid, styles.section]}>
                <GivingTierEntry name="JOY Partner" amount={20} />
                <GivingTierEntry name="FAITH Partner" amount={30} />
                <GivingTierEntry name="HOPE Partner" amount={50} />
                <GivingTierEntry name="LOVE Partner" amount={100} />
                <GivingTierEntry name="FAVOR Partner" amount={500} />
                <GivingTierEntry name="VIP Partner" amount={1000} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainHeading: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 22,
        letterSpacing: -0.3
    },
    section: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    givingGrid: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    }, 
    text: {
        fontFamily: "SplineSans_400Regular",
        fontSize: 16
    },
    paddingTop24: {
        paddingTop: 24
    },
    sectionHeading: {
        fontSize: 18,
        fontFamily: "SplineSans_400Regular",
        marginBottom: 16
    }
})

const GivingTierEntry = ({ amount, name }: { amount: number, name: string }) => {

    const customStyles = StyleSheet.create({
        card: {
            padding: 4,
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor: "#0c0c0c",
            height: 100,
            minWidth: "25%",
            flex: 1,
            justifyContent: "space-between"
        },
        faded: {
            opacity: 0.75
        },
        heading: {
            fontFamily: "SplineSans_300Light",
            fontSize: 22
        },
        text: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 14
        },
        smallText: {
            fontFamily: "SplineSans_400Regular",
            fontSize: 12
        }
    })

    return (
        <Pressable style={({pressed})=>pressed ? [customStyles.card, customStyles.faded] : customStyles.card}>
            <View style={{backgroundColor: "#ffffff00"}}>
                <Text style={customStyles.heading}>$ {amount}</Text>
                <Text style={customStyles.smallText}>monthly</Text>
            </View>
            <Text style={customStyles.text}>{name}</Text>
        </Pressable>
    )
}