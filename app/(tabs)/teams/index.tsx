import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link, router } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useEffect, useState } from 'react';

export default function TeamsScreen() {


  const user_id: string = "jd768t1gxzhh7kh05szt0t7zw16sjap0"
  // const user_id: string = "jd797379pdh7f814dzd06375j16skv19"

  const userTeams = useQuery(api.teams.getTeamsForUser, {user: user_id})
  console.log(`printing teams for user ${user_id}: ${JSON.stringify(userTeams)}`)

  const [ teams, setTeams ] = useState<Array<any>>() 

  useEffect(()=>{
      setTeams(userTeams)
  },[userTeams])


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your teams</Text>
        {teams && teams.map(team => <TeamCard title={team.name} link={`/(tabs)/teams/team-details/?teamId=${team._id}`} />)}
        {/* <TeamCard title="Worship" link="/(tabs)/teams/team-details" /> */}
      </View>
      <View>
        <Text style={styles.title}>Manage teams</Text>
        <Text>Join a team</Text>
        <Text>Edit membership</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
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
});


const TeamCard = ({ title, link }) => {

  const customStyles = StyleSheet.create({
    card: {
      width: "100%",
      paddingVertical: 32,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: "#fff",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowColor: "#fff"
    },
    text: {
      fontFamily: "SplineSans_600SemiBold",
      textTransform: "uppercase"
    }
  })

  return (
    <Pressable style={customStyles.card} onPress={()=>router.navigate(link)}>
      <Text style={customStyles.text}>{title}</Text>
    </Pressable>
  )
}