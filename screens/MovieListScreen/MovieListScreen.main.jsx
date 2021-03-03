import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import MovieFilterScreen from "../MovieFilterScreen/MovieFilterScreen.main";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";

// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/movies.json");

// Input: navigation & route params, which we recieve through React Navigation
// Output: a screen containing the list of movies
export default function MovieListScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);

  // TODO: Fill out the methods below.
  const selectedMovie = (movieItem) => {
    navigation.navigate("MovieDetailScreen", {"item":movieItem});
  };

  const selectedFilterButton = () => {
    navigation.navigate('MovieFilterScreen', {"actors": actors});
  };

  useEffect(
    () => {
      // TODO: Add a "Filter" button to the right bar button.
      // It should lead to the MovieFilterScreen, and pass the "actors" state
      // variable as a parameter.
      navigation.setOptions({
        headerRight: () => (
          <Button 
            onPress={()=>{selectedFilterButton()}}
            title="Filter"
          />
        ),
      });
    },
    [
      actors
    ]
  );

  useEffect(
    () => {
      /* TODO: Recieve the updated list of actors from the filter screen here. 
          See https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen
          for an example of how to send data BACKWARDS in the navigation stack.
      */
     if (route.params?.actors){
      setActors(route.params.actors);
     }
    },
    [
      /* TODO: Insert dependencies here. What variable changes 
        when we come back from the filter screen? */
      route
    ]
  );

  // Renders a row of the FlatList.
  const renderItem = ({ item }) => {
    const overlapFound = (listA, listB) => {
      let foundActor = false;
      listA.forEach((x) => {
        if (listB.includes(x)) {
          foundActor = true;
        }
      });
      return foundActor;
    };

    // TODO: Set up search & filter criteria.
    let meetsSearchCriteria = search.length == 0 ? true : item.title.toLowerCase().includes(search.toLowerCase());
    let meetsActorsCriteria = actors.length == 0 ? true : overlapFound(actors, item.actors);

    if (meetsSearchCriteria && meetsActorsCriteria) {
      // TODO: Return a MovieCell, wrapped by a TouchableOpacity so we can handle taps.
      return (
        <View>
            <TouchableOpacity
              activeOpacity={0.8}
              // key={index}
              onPress={() => selectedMovie(item)}
            >
              <MovieCell movieItem={item}></MovieCell>
            </TouchableOpacity>
          </View>
        );
    } else {
      // If the item doesn't meet search/filter criteria, then we can
      // simply return null and it won't be rendered in the list!
      return null;
    }
  };

  // Our final view consists of a search bar and flat list, wrapped in
  // a SafeAreaView to support iOS.
  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Add a SearchBar: https://reactnativeelements.com/docs/searchbar/.
                The third-party package should already be installed for you. */}
      {/* TODO: Add a FlatList: https://reactnative.dev/docs/flatlist */}
      <SearchBar
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        platform="ios"
      />
      <FlatList
        data={TABLE_DATA}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
      />
    </SafeAreaView>
  );
}
