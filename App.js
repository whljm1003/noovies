import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

const loadFont = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFont([Ionicons.font]);
    const images = loadImages([
      require("./Img/my-face.png"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);
    await Promise.all([...fonts]);

    /*  
  Asset => 로컬에서 img 불러올 때 사용 (주로 Asset 선호)
  await Asset.loadAsync(require("./Img/my-face.png"));
  prefetch => server에서 img 불러올 때 사용 
  await Image.prefetch("https://reactnative.dev/img/oss_logo.png"); 
  */
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
