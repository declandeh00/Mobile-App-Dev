/**
 * @file This file is the display for the recipes in a given cuisine
 * @author Declan de Haas
 */

// This is the import used to create the HTML code
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

// This is the main component that work the screen
const CuisineDetailsScreen = (props) => {
  const { cuisine } = props.route.params;

  const cuisineRecipe = cuisine.data;

  // This is the way that the recipes of a cuisine will be rendered
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
    // This is the Flat list viewing of the screen
    <View className="flex-1">
      <FlatList data={cuisineRecipe} renderItem={renderItem} />
    </View>
  );
};

export default CuisineDetailsScreen;
