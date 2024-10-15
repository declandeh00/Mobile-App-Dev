/**
 * @file This is the screen that displays the list of recipes that have been added to the favourites
 * @author Declan de Haas
 */

// These are the imports that allow me to do the html code and get the data
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// This is the component that does the FavouriteRecipe screen
const FavouriteRecipeScreen = (props) => {
  const [data, setData] = useState([]);
  const { width } = Dimensions.get('window');

  // This is the use effect that gets the data and makes sure that the data will always reload when new data is added
  useEffect(() => {
    getData();
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [props.navigation]);

  // This is the function that gets the data from the async storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('favouriteRecipes');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // This deletes the data from async storage
  const deleteData = async (recipeToDelete) => {
    try {
      const updatedData = data.filter(
        (recipe) => recipe.name !== recipeToDelete.name
      );
      await AsyncStorage.setItem(
        'favouriteRecipes',
        JSON.stringify(updatedData)
      );
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const iconSize = width > 600 ? 50 : 30;

  // This renders the display of how each flat list item will look
  const renderItem = ({ item }) => (
    <View className="flex-row justify-items-center items-center p-2">
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Recipe Details', { recipe: item });
        }}
      >
        <Image
          className="h-24 w-24 md:h-56 md:w-56"
          source={{ uri: item.image }}
        />
      </TouchableOpacity>
      <View className="flex-1 ml-2">
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Recipe Details', { recipe: item });
          }}
        >
          <Text
            className="text-lg md:text-4xl"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      {/* This is where the delete is called from */}
      <TouchableOpacity onPress={() => deleteData(item)}>
        <Icon name="trash" size={iconSize} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default FavouriteRecipeScreen;
