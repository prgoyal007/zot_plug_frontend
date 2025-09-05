import { View, Text } from "react-native"
import { useLocalSearchParams } from 'expo-router'

export default function Dashboard() {
  const { userId } = useLocalSearchParams();
  return (
    <View>
      <Text> {`Elllo Ello, Unique Dash of user ${userId} `}</Text>
    </View>
  )
}
