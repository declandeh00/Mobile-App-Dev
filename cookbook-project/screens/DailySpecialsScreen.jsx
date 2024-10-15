/**
 * @file This is the screen that displays 6 random recipe names and image
 * @author Declan de Haas
 */

// These are the imports that allow me to do the html code and get the data
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import data from '../data/food-data.json';

// This is the component that does the Daily Specials screen
const DailySpecialsScreen = (props) => {
  const [randRecipes, setRandRecipes] = useState('');

  // This is the use effect that gets the data and randomly selects 6 recipes
  useEffect(() => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const randomRecipes = shuffleArray(data.recipes).slice(0, 6);
    setRandRecipes(randomRecipes);
  }, []);

  // This is the way i am able to render the recipes and allow them to be clickable and open into the recipe details
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Recipe Details', { recipe: item });
      }}
    >
      <View className="flex-row justify-items-center items-center p-2">
        <Image
          className="h-24 w-24 md:h-56 md:w-56"
          source={{ uri: item.image }}
        />
        <View className="flex-1 ml-2">
          <Text
            className="text-lg md:text-4xl"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    // This displays the flat list and the recipe screen
    <View className="flex-1">
      <FlatList data={randRecipes} renderItem={renderItem} />
    </View>
  );
};

export default DailySpecialsScreen;
