import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);

    await Asset.loadAsync(require("./Img/my-face.png"));
    /*  
  Asset => 로컬에서 img 불러올 때 사용 (주로 Asset 선호)
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
  return <Text>We are done loading!</Text>;
}
