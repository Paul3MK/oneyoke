import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs, router } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        // header: ()=><CustomTabNavigation/>
      }}
      // tabBar={(props)=><CustomTabNavigation {...props}/>}>
      >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/(general)/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="home"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule"
        }}/>
    </Tabs>
  );
}


const CustomTabNavigation = ({ state, descriptors, navigation }) => {


  const customStyles = StyleSheet.create({
    navigationBar: {
      backgroundColor: "#fff",
      height: 48,
      justifyContent: "space-between",
      flexDirection:"row",
      alignItems: "center",
      paddingHorizontal: 16
    },
    navigationLink: {
      alignItems: "center"
    },
    navigationLinkText:{
      fontFamily: "SplineSans_700Bold"
    }
  })

  return (
    <View style={customStyles.navigationBar}>
      <View style={customStyles.navigationLink}>
        <MaterialIcons name='home' size={24}/>
        <Text style={customStyles.navigationLinkText}>Home</Text>
        </View>
      <View style={customStyles.navigationLink}>
      <MaterialIcons name='workspaces-outline' size={24}/>
        <Text style={customStyles.navigationLinkText}>Teams</Text>
      </View>
      <View style={customStyles.navigationLink}>
      <MaterialIcons name='calendar-view-day' size={24}/>
        <Text style={customStyles.navigationLinkText}>Schedule</Text>
      </View>
      <View style={customStyles.navigationLink}>
      <MaterialIcons name='person-4' size={24}/>
        <Text style={customStyles.navigationLinkText}>Me</Text>
      </View>
    </View>
  )
}

const customHeader = () => {
  
}