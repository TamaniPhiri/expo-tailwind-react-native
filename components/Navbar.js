import { View, SafeAreaView, Text } from "react-native";

const Navbar = () => {
  return (
    <SafeAreaView className="fixed top-0">
      <View className="mt-6 py-4 flex flex-row px-4 justify-between bg-[#101010] shadow-md">
        <View >
            <Text className="text-white">Logo</Text>
        </View>
        <View className="bg-red-300">
          <View className="w-8 h-[1px] bg-white"></View>
          <View className="w-8 h-[1px] bg-white"></View>
          <View className="w-8 h-[1px] bg-white"></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
