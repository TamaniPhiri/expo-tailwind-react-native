import { MotiView, AnimatePresence } from "moti";
import { useReducer } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

const Navbar = () => {
  const [open, setOpen] = useReducer((s) => !s, true);
  return (
    <SafeAreaView className="fixed z-50 top-0">
      <View className="mt-6 py-6 relative flex flex-row px-4 items-center justify-between bg-[#202020] shadow-md">
        <View className="rounded-full bg-black p-1">
          <Feather name="user" color="#fff" size={24}/>
        </View>
        <TouchableOpacity
          onPress={setOpen}
          className="flex relative justify-center flex-col gap-1 items-center"
        >
          <View
            className={`w-6 h-[1px] ${
              open ? "-rotate-45 translate-y-[3px]" : ""
            } bg-white transition-all duration-300`}
          ></View>
          <View
            className={`w-6 h-[1px] ${
              open ? "hidden" : ""
            } bg-white transition-all duration-300`}
          ></View>
          <View
            className={`w-6 h-[1px] ${
              open ? "rotate-45 -translate-y-[3px]" : ""
            } bg-white transition-all duration-300`}
          ></View>
        </TouchableOpacity>
      </View>
      <AnimatePresence>
        <View className="absolute w-screen inset-0 top-[100%]">
          {open && (
            <MotiView
              from={{ opacity: 1, translateX: 300 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{
                opacity: 0,
                translateX: 300,
              }}
              transition={{
                duration: 0.4,
                damping: 16,
              }}
              className="flex-1 w-full flex-row"
            >
              <TouchableOpacity
                onPress={setOpen}
                className="w-1/3 shadow-md h-screen"
              ></TouchableOpacity>
              <View className="bg-[#202020] w-2/3 shadow-md h-screen">
                <Text>hello</Text>
                <Text>hello</Text>
                <Text>hello</Text>
                <Text>hello</Text>
              </View>
            </MotiView>
          )}
        </View>
      </AnimatePresence>
    </SafeAreaView>
  );
};

export default Navbar;
