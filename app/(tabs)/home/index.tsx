import { Image, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link, LinkProps } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import CTA from '@/components/CTA/CTA';

// import img from "../../../assets/images/nina-strehl-Ds0ZIA5gzc4-unsplash.jpg"

export default function HomeScreen() {

  const events = useQuery(api.events.get)

  const [ eventsList, setEventsList ] = useState<undefined | typeof events>()

  useEffect(()=>{
    setEventsList(events)
  },[events])

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Upcoming Events</Text>
        <ScrollView contentContainerStyle={styles.eventTrack} horizontal>
        { eventsList && eventsList.slice(0,3).map(event=><EventCard image={{uri: event.image}} linkTo={event._id} title={event.name} date={event.date} />)}
        </ScrollView>
      </View>
      {/* <Image source={{ uri: "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} resizeMode='cover' style={{ height: 200, width: 200 }} /> */}
      <View style={styles.section}>
        <Text>Your Agenda</Text>
        <AgendaCard team="Instrumentalists" date="28.04" role="Keyboard" note="MD: Michael M." link="" />
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Give</Text>
        <CTA text="Give to this ministry"/>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Contribute</Text>
        <CTA text="Contribute to this ministry"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  eventTrack: {
    height: 120,
    width: "auto",
    display: "flex",
    gap: 8
  },
  section: {
    paddingHorizontal: 16,
  },
  heading: {
    fontFamily: "SplineSans_600SemiBold",
    fontSize: 24,
    marginVertical: 16
  }
});

const EventCard = ({ image, linkTo, title, date }: { image: ImageSourcePropType, linkTo: any, title: string, date: string }) => {


  const custom = StyleSheet.create({
    bgImage: {
      flex: 1
    },
    card: {
      height: 200,
      width: 300,
      backgroundColor: "#aaeeff",
    }
  })

  return (
    <View style={custom.card}>
      <ImageBackground source={image} resizeMode='cover' style={custom.bgImage}>
        <View style={{ backgroundColor: "#ffffff00" }}>
          <Text>{title}</Text>
          <Text>{date}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}


const AgendaCard = ({ team, date, role, note, link }) => {

  const customStyles = StyleSheet.create({
    card: {
      borderLeftWidth: 2,
      borderLeftColor: "#E88B00",
      backgroundColor: "#444"
    }
  })

  return (
    <View style={customStyles.card}>
      <View style={{ backgroundColor: "#ffffff00" }}>
        <Text>Instrumentalists</Text>
        <Text>28.04</Text>
      </View>
      <Text>E. Guitar (Rhythm)</Text>
      <View style={{ backgroundColor: "#ffffff00" }}>
        <Text>MD - You</Text>
        <Link href={link}>arrow</Link>
      </View>
    </View>
  )
}