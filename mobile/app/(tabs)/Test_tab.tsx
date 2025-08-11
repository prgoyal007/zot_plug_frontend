import Constants from "expo-constants"
import { View, StyleSheet } from 'react-native';
import { Test } from "ui/test"
import { TestButton } from "ui/test_button"
import { createApiClient } from "api/req"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

export default function Test_tab() {

  const api = createApiClient({ device: "mobile", baseUrlOverride: Constants.expoConfig?.extra?.API_URL })

  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await api.fetchJSON<{ message: string }>({ endpoint: "/", method: "GET" })
  })

  useEffect(() => {
    if (!isLoading) {
      console.log(test_data)
    }
  }, [isLoading, test_data])

  return (
    <View style={styles.container}>
      <Test />
      <TestButton onPress={async () => {
        const data = await api.fetchJSON<{ message: string }>({ endpoint: "/", method: "GET" })
        console.log(data)
      }} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
