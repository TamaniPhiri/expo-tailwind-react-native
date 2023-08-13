import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import axios from "axios";
import { MotiView } from "moti";

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
    <SafeAreaView className="bg-[#101010] flex-1 justify-around py-4 px-4">
      {/*Search */}
      <MotiView className="flex bg-[#202020] rounded-full p-2 items-center justify-between flex-row">
        <TextInput
          onChangeText={(text) => handleInput(text)}
          className="flex flex-1 text-white pl-2"
        />
        <TouchableOpacity
          onPress={handleSubmit}
          className="px-2 flex items-center justify-center"
        >
          <Ionicons name="search" color="white" size={28} />
        </TouchableOpacity>
      </MotiView>

      {loading ? (
        <View className="flex w-full items-center justify-center">
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <View>
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
              <Text className="font-bold text-white text-xl">{data.name}</Text>
              <Text className="text-gray-400 font-light text-xs pt-1">
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </Text>
            </View>
            <Text className="font-bold text-gray-400 text-3xl">{data.sys.country}</Text>
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
            className="flex w-full bg-[#202020] shadow-lg rounded-xl p-4 flex-row justify-around items-center"
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
    </SafeAreaView>
  );
};

export default Home;
