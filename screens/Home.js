import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-[#101010] flex-1 py-4 px-4">
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text className="font-bold text-white text-xl">Zambia</Text>
          <Text className="text-gray-500 font-light text-xs pt-1">12 May, Sat</Text>
        </View>
        <TouchableOpacity className="p-2s bg-[#202020] rounded-md flex items-center justify-center">
          <Feather name="grid" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
