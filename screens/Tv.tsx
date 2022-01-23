import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv = () => {
  const { data: trendingData, isLoading: Loadingtrending } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );
  const { data: todayData, isLoading: Loadingtoday } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { data: topData, isLoading: Loadingtop } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const loading = Loadingtrending || Loadingtoday || Loadingtop;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView>
      <FlatList
        data={trendingData.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        data={topData.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        data={todayData.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};
export default Tv;
