import { View, Text, TextInput } from "react-native"
import { Test } from "ui/test"
import { TestButton } from 'ui/test_button'
import BasicButton from 'ui/components/basic_button'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { getAllDevices } from "@/api_utils/api_actions"

export default function Home() {
  const router = useRouter()
  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await getAllDevices()
  })

  /* useEffect is situational, use if you want a action to run on first render */
  function log_test_data() {
    console.log(test_data)
  }

  useEffect(() => {
    if (!isLoading) {
      console.log(test_data)
    }
  }, [isLoading, test_data])

  return (
    <>
      <View className="flex flex-col justify-center mt-4 gap-y-4">
        <Test />
        <TestButton onPress={log_test_data} />
        <BasicButton text='Login' onPress={() => router.push('/auth?mode=login')} />
        <BasicButton text='Test Page' onPress={() => router.push('/(tabs)')} />
      </View>
    </>
  );
}
