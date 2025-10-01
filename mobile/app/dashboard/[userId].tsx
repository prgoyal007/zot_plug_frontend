// mobile/app/dashboard/[userId].tsx
import React from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { validate_jwt } from "@/api_utils/api_actions"              // removed getAllDevices
import BasicButton from 'ui/components/basic_button'
import { Category } from "ui/components"

export default function Dashboard() {
  const { userId } = useLocalSearchParams();
  const router = useRouter()

  const { data: validated, isLoading: isValidating } = useQuery({
    queryKey: ['validated'],
    queryFn: async () => await validate_jwt()
  })

  // async function test_token() {
  //   const res = await getAllDevices()
  //   console.log(res)
  // }

  async function test_val() {
    const res = await validate_jwt()
    console.log(res)
  }

  useEffect(() => {
    if (!isValidating) {
      if (!validated!.ok) router.push("/auth?mode=login")
    }
  }, [validated, isValidating, router])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {`Elllo Ello, Unique Dash of user ${userId} `}      
      </Text>

      {/* <BasicButton onPress={test_token} text={"Get All Devices"} /> */}
      <BasicButton onPress={test_val} text={"Validate Token"} />

      <Text style={[ styles.header, { marginTop: 24 }]}>Categories</Text>
      <View style={styles.grid}>
        <Category
          displayText="Lightning"
          imageFilePath="/images/lightning.png"
          size="big"
          onPress={() => console.log('Lightning pressed')}
        />

        <Category
          displayText="Fans"
          imageFilePath="/images/fan.png"
          size="small"
          onPress={() => console.log('Fans pressed')}
        />

        <Category
          displayText="Heating"
          imageFilePath="/images/heater.png"
          size="small"
          onPress={() => console.log('Heating pressed')}
        />
      </View>
    </ScrollView>
  
    /* <View>
      <Text> {`Elllo Ello, Unique Dash of user ${userId} `}</Text>
      <BasicButton onPress={test_token} text={"Get All Devices"} />
      <BasicButton onPress={test_val} text={"Validate Token"} />
    </View> */

  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'flex-start',
  },
});