import { View, Text } from "react-native"
import { useLocalSearchParams } from 'expo-router'
import { getAllDevices } from "@/api_utils/api_actions";
import BasicButton from 'ui/components/basic_button'

export default function Dashboard() {
  const { userId } = useLocalSearchParams();

  async function test_token() {
    const res = await getAllDevices()
    console.log(res)
  }

  return (
    <View>
      <Text> {`Elllo Ello, Unique Dash of user ${userId} `}</Text>
      <BasicButton onPress={test_token} text={"Get All Devices"} />
    </View>
  )
}
