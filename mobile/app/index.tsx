import { View, Text } from "react-native"
import { Test } from "ui/test"
import { TestButton } from 'ui/test_button'
import BasicButton from 'ui/components/basic_button'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()
  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => { return (<Text>Test test</Text>) }
  })

  /* useEffect is situational, use if you want a action to run on first render */
  useEffect(() => {
    if (!isLoading) {
      console.log(test_data)
    }
  }, [isLoading, test_data])

  return (
    <>
      {/* Tailwind in-line styling */}
      <View className="bg-red-500 w-full h-10"> <Text>test test</Text></View>
      { /* Shared UI comp, check proj_root/ui to check how this works */}
      <View className="bg-green-500 w-full h-10">
        <Text>{isLoading ? "Fetching_data" : "Data logged to client console"}</Text>
      </View>
      <View className="flex flex-col justify-center mt-4 gap-y-4">
        <Test />
        <TestButton onPress={async () => {
          console.log(test_data)
        }} />
        <BasicButton text='Login' onPress={() => router.push('/auth')} />
      </View>
    </>
  );
}
