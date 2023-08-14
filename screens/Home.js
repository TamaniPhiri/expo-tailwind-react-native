import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useEffect, useState } from "react";
import axios from "axios";
import { MotiView, AnimatePresence } from "moti";
import { ScrollView ,GestureHandlerRootView} from "react-native-gesture-handler";

const APIkey = "db5595bf66ed081a4a8bc0aff8227211";

const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Lusaka");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleInput = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    try {
      if (inputValue === "") {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);
      } else {
        setLocation(inputValue);
      }

      setInputValue(""); // Clear inputValue
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
          }, 2000);
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
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, delay: 200 }}
        >
          <Text className="text-white my-4 text-center">Loading...</Text>
        </MotiView>
        <ActivityIndicator color="white" size={100} />
      </View>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <Feather name="cloud" color="white" size={90} />;
      break;
    case "Haze":
      icon = <Fontisto name="day-haze" color="white" size={90} />;
      break;
    case "Rain":
      icon = <Feather name="cloud-rain" color="white" size={90} />;
      break;
    case "Clear":
      icon = <Feather name="sun" color="white" size={90} />;
      break;
    case "Drizzle":
      icon = <Feather name="cloud-drizzle" color="white" size={90} />;
      break;
    case "Snow":
      icon = <Fontisto name="snowflake-2" color="white" size={90} />;
      break;
    case "Thunderstorm":
      icon = <Feather name="cloud-lightning" color="white" size={90} />;
      break;
  }

  const date = new Date();
  return (
    <GestureHandlerRootView>
    <ScrollView className="flex-1">
      <SafeAreaView className="bg-[#101010] relative flex-1 justify-between py-8 px-4">
        <AnimatePresence>
          {errorMsg ? (
            <MotiView
              from={{ opacity: 0, translateY: -40 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-50 top-28 w-full items-center text-black"
            >
              <View className="flex capitalize w-full items-center rounded py-4 justify-center">
                <Text className="max-w-md rounded-md capitalize text-red-500 font-bold shadow bg-[#202020] backdrop-blur-sm p-4">
                  {errorMsg}!
                </Text>
              </View>
            </MotiView>
          ) : null}
        </AnimatePresence>
        {/*Search */}
        <MotiView
          from={{ opacity: 0, translateX: -40 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            type: "timing",
            duration: 1000,
          }}
          className="flex bg-[#202020] rounded-full p-1 items-center justify-between flex-row"
        >
          <TextInput
            onChangeText={(text) => handleInput(text)}
            className="flex flex-1 text-white pl-2"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-2 px-4 flex items-center rounded-full bg-zinc-700 justify-center"
          >
            <Ionicons name="search" color="white" size={24} />
          </TouchableOpacity>
        </MotiView>

        {loading ? (
          <View className="flex w-full flex-1 items-center justify-center">
            <ActivityIndicator size={100} color="white" />
          </View>
        ) : (
          <View className="flex flex-1 justify-center">
            {/* More Details */}
            <MotiView
              from={{ opacity: 0, translateY: -40 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 1000,
              }}
              className="flex flex-row justify-between my-5 items-center"
            >
              <View>
                <Text className="font-bold text-white text-xl">
                  {data.name}
                </Text>
                <Text className="text-gray-400 font-light text-xs pt-1">
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </Text>
              </View>
              <Text className="font-bold text-gray-400 text-3xl">
                {data.sys.country}
              </Text>
            </MotiView>
            {/* Temperature and Icon */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "timing",
                duration: 400,
              }}
              className="flex flex-row justify-around w-full items-center"
            >
              <View className="my-6">
                <Text
                  className={`text-6xl text-center ${
                    data.main.temp <= 20
                      ? "text-blue-300"
                      : data.main.temp >= 35
                      ? "text-orange-400"
                      : data.main.temp <= 10
                      ? "text-blue-400"
                      : data.main.temp >= 30
                      ? "text-orange-200"
                      : "text-white"
                  }`}
                >
                  {parseInt(data.main.temp)}°
                </Text>
                <Text className="text-white text-center capitalize">
                  {data.weather[0].description}
                </Text>
              </View>
              <View>{icon}</View>
            </MotiView>

            {/* Details */}
            <MotiView
              from={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "timing",
                duration: 800,
              }}
              className="flex w-full bg-[#202020] shadow-lg rounded-xl mb-16 p-4 flex-row justify-around items-center"
            >
              <View className="flex items-center">
                <Fontisto name="wind" color="white" size={24} />
                <Text className="text-gray-400 mt-2 text-center">
                  {data.wind.speed} m/s
                </Text>
                <Text className="text-xs text-gray-600 mt-2 text-center">
                  Wind
                </Text>
              </View>
              <View className="flex items-center">
                <Ionicons name="water" color="white" size={24} />
                <Text className="text-gray-400 mt-2 text-center">
                  {data.main.humidity} %
                </Text>
                <Text className="text-xs text-gray-600 mt-2 text-center">
                  Humidity
                </Text>
              </View>
              <View className="flex items-center">
                <Fontisto name="eye" color="white" size={24} />
                <Text className="text-gray-400 mt-2 text-center">
                  {data.visibility / 1000} km
                </Text>
                <Text className="text-xs text-gray-600 mt-2 text-center">
                  Visibility
                </Text>
              </View>
              <View className="flex items-center">
                <Ionicons name="thermometer-outline" color="white" size={24} />
                <Text className="text-gray-400 mt-2 text-center">
                  {parseInt(data.main.feels_like)}°
                </Text>
                <Text className="text-xs text-gray-600 mt-2 text-center">
                  Feels like
                </Text>
              </View>
            </MotiView>
          </View>
        )}
        <View className="flex w-full items-center rounded justify-center">
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://weather-bay-puce.vercel.app/")
            }
            className="flex flex-row gap-2 items-center justify-center py-2 shadow-xl rounded-full w-full bg-[#202020]"
          >
            <Text className="text-gray-400">Visit the web app</Text>
            <Entypo name="globe" size={20} color="#d3d3d3" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
