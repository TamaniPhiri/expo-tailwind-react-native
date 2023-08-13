import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const[open,setOpen]=useState(false);
  return (
    <View className="flex-1 relative justify-center overflow-x-hidden items-center bg-[#101010]">
      <Text className="text-white">Open up App.js to sta on you</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={()=>setOpen(!open)} className="flex my-8 flex-col gap-1">
        <View className="w-5 h-1 bg-white"></View>
        <View className="w-5 h-1 bg-white"></View>
        <View className="w-5 h-1 bg-white"></View>
      </TouchableOpacity>
      <View className={`absolute shadow-md ${open?"w-1/2":"w-0"} top-0 right-0 h-screen transition transform duration-300 delay-200 bg-[#252528]`}>
        <Text className="text-white">hello</Text>
        <TouchableOpacity>
          <Text onPress={()=>setOpen(false)} className="text-white">X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}