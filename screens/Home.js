import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useEffect, useState } from "react";
import axios from "axios";

const APIkey = "db5595bf66ed081a4a8bc0aff8227211";

const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Lusaka");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    try {
      if (inputValue === "") {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);
      }
      if (inputValue !== "") {
        setLocation(inputValue);
      }
      const input = document.querySelector("input");
      input.value = "";
      e.preventDefault();
    } catch (error) {
      setErrorMsg("Something went wrong..");
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      setErrorMsg("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.message);
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        });
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg("Something went wrong");
    }
  }, [location]);

  if (!data) {
    return (
      <View className="flex min-h-screen w-full bg-[#101010] items-center justify-center">
        <ActivityIndicator color="white" size={50} />
      </View>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <Feather name="cloud" color="white" size={74} />;
      break;
    case "Haze":
      icon = <Fontisto name="day-haze" color="white" size={74} />;
      break;
    case "Rain":
      icon = <Feather name="cloud-rain" color="white" size={74} />;
      break;
    case "Clear":
      icon = <Feather name="sun" color="white" size={74} />;
      break;
    case "Drizzle":
      icon = <Feather name="cloud-drizzle" color="white" size={74} />;
      break;
    case "Snow":
      icon = <Fontisto name="snowflake-2" color="white" size={74} />;
      break;
    case "Thunderstorm":
      icon = <Feather name="cloud-lightning" color="white" size={74} />;
      break;
  }

  const date = new Date();
  return (
    <SafeAreaView className="bg-[#101010] flex-1 py-4 px-4">
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text className="font-bold text-white text-xl">{data.name}</Text>
          <Text className="text-gray-500 font-light text-xs pt-1">
            {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
          </Text>
        </View>
        <TouchableOpacity className="p-2 bg-[#202020] rounded-md flex items-center justify-center">
          <Feather name="grid" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-evenly w-full items-center">
        <View className="my-6">
          <Text className="text-6xl text-white">
            {parseInt(data.main.temp)}°
          </Text>
          <Text className="text-white">{data.weather[0].description}</Text>
        </View>
        <View>
          {icon}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
