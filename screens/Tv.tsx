import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    data: trendingData,
    isLoading: Loadingtrending,
    isRefetching: trendingRefresh,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const {
    data: todayData,
    isLoading: Loadingtoday,
    isRefetching: todayRefresh,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    data: topData,
    isLoading: Loadingtop,
    isRefetching: topRefresh,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };
  const loading = Loadingtrending || Loadingtoday || Loadingtop;
  const refreshing = trendingRefresh || todayRefresh || topRefresh;
  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};
export default Tv;
