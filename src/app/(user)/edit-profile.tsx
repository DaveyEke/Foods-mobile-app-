import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Link } from 'expo-router'

const editProfile = () => {
  return (
    <View>
      <Link href={'/(user)/profile'}>
      <Text>edit-profile</Text>
      </Link>
    </View>
  )
}

export default editProfile
const styles = StyleSheet.create({})