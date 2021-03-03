import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { styles } from "./MovieDetailScreen.styles";

export default function MovieDetailScreen({ route }) {
  // TODO: Recieve the movieItem by destructuring route params.
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* TODO: Configure this screen to have an image and appropriate text describing the movie. 
                See the example on the spec for design inspiration.
                Feel free to use the styles below. */}
                <Image
                  source={
                    {
                      uri: route.params.item.posterurl
                    }
                  }
                  style = {
                    {
                      justifyContent: "center",
                      margin: 10,
                      height:250,
                      width: "100%",
                      resizeMode: "contain",
                    }
                  }
                />
                <Text 
                  style={styles.h1}
                >
                  {route.params.item.title} ({route.params.item.year})
                </Text>
                <Text
                  style={styles.h2}
                >
                  Genres: {route.params.item.genres.join(", ")}
                </Text>
                <Text
                  style = {styles.h3}
                >
                  Starring: {route.params.item.actors.join(", ")}
                </Text>
                <Text
                  style = {styles.h4}
                >
                  Storyline: {route.params.item.storyline}
                </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
