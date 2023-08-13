import { View, Text, SafeAreaView,TouchableOpacity } from 'react-native'

const Home = ({navigation}) => {
  return (
    <SafeAreaView className="bg-[#101010] flex-1">
      <Text className="text-white my-0">Home</Text>
      <TouchableOpacity>
        <Text onPress={()=>navigation.navigate('Details')} className="text-white my-0">Details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home