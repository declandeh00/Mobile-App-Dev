/**
 * @file This is the screen that displays the Shopping List ingredients
 * @author Declan de Haas
 */

// These are the imports that allow me to do the html code and get the data
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// This is the component that creates and displays the ShoppingList screen
const ShoppingListScreen = (props) => {
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
      const value = await AsyncStorage.getItem('ShoppingList');
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
      await AsyncStorage.setItem('ShoppingList', JSON.stringify(updatedData));
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const iconSize = width > 600 ? 50 : 30;

  // This renders the display of how each flat list item will look
  const renderItem = ({ item }) => (
    <View className="flex-row justify-items-center items-center p-2">
      <View className="flex-1 ml-2">
        {/* This is the mapping to allow the ingredients to go in list form one after another  */}
        {item.ingredients.map((ingredient, index) => (
          <Text className="text-xl md:text-5xl" key={index}>
            {ingredient}
          </Text>
        ))}
      </View>
      <TouchableOpacity onPress={() => deleteData(item)}>
        <Icon name="trash" size={iconSize} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
  //
  return (
    <View className="flex-1">
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default ShoppingListScreen;
