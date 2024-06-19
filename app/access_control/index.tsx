import React, { SetStateAction, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';

import { Text, View } from '@/components/Themed';
import NavigateButton from '@/components/CTA/NavigateButton';
import BaseTextInput from '@/components/Inputs/BaseTextInput';

export default function LoginOrSignupScreen() {

  const [accountExists, setAccountExists] = useState<undefined | boolean>(true)
  const [name, setName] = useState<undefined | string>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login or signup screen</Text>
      {!accountExists && <View>
        <TextField>
          <Text>Name</Text>
          <BaseTextInput placeholder="John" />
          <BaseTextInput placeholder='Doe' />
        </TextField>
      </View>}
      <TextField>
        <Text>Email</Text>
        <BaseTextInput placeholder='example@xyz.com' />
      </TextField>
      <TextField>
        <Text>Password</Text>
        <BaseTextInput placeholder=''/>
      </TextField>
      {!accountExists && <View>
        <TextField>
          <Text>Set a password</Text>
          <BaseTextInput placeholder="Password" />
          <BaseTextInput placeholder='Confirm password' />
        </TextField>
      </View>}
      {/* <Button title='Check this out' onPress={()=>setAccountExists(!accountExists)}/> */}
      <NavigateButton link="/(general)" text="Continue" />
      <View>
        <Text>By signing up, you agree to OneYoke's <Link href="/">Terms and Conditions</Link>, and <Link href="/">Privacy Policy.</Link></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16
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

const TextField = ({ children }) => {
  return (
    children
  )
}