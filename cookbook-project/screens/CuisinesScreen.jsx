/**
 * @file This is the screen that will display all the cuisines
 * @author Declan de Haas
 */

// These are the imports that allow me to do the html code and get the data
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import data from '../data/food-data.json';

// This is the component that does the cuisines screen
const CuisineScreen = (props) => {
  const cuisine = ['Italian', 'Japanese', 'Indian', 'American', 'French'];

  // This filters the data by cuisines
  const getFoodByCuisine = (cuisine) =>
    data.recipes.filter((cuisines) => cuisines.cuisine === cuisine);

  // This is the way that the recipes of a cuisine will be rendered
  const renderItem = ({ item }) => (
    <View className="flex-row justify-items-center items-center p-2">
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Cuisine Recipes', { cuisine: item });
        }}
      >
        <Text
          className="text-lg md:text-6xl"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // This maps the data by cuisine
  const renderCuisine = cuisine.map((cuisine) => ({
    title: cuisine,
    data: getFoodByCuisine(cuisine)
  }));

  return (
    // This displays the cuisines in a flat list style
    <View className="flex-1">
      <FlatList data={renderCuisine} renderItem={renderItem} />
    </View>
  );
};

export default CuisineScreen;
