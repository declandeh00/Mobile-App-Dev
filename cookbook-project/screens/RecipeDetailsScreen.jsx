/**
 * @file This is the screen that displays the recipe in full for a certain recipe that is clicked
 * @author Declan de Haas
 */

// These are the imports that allow me to do the html code and get the data
import {
  Text,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

// This is the component that does the RecipeDetails screen
const RecipeDetails = (props) => {
  const { recipe } = props.route.params;
  const { width } = Dimensions.get('window');

  // This is how the data is saved to the async storage list
  const saveRecipeData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favouriteRecipes');
      const favourites = jsonValue != null ? JSON.parse(jsonValue) : [];

      // This is how you make sure that the data does not appear more than once
      const isAlreadyFavourite = favourites.some(
        (fav) => fav.name === recipe.name
      );

      if (isAlreadyFavourite) {
        Alert.alert(
          'Already Added',
          'This recipe is already in your favourites.'
        );
        return;
      }

      // This pushed all the data to the favourites
      favourites.push(recipe);

      await AsyncStorage.setItem(
        'favouriteRecipes',
        JSON.stringify(favourites)
      );

      Alert.alert('Saved', 'Recipe added to your favourites!');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };
  const saveRecipeIngredients = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('ShoppingList');
      const ingredients = jsonValue != null ? JSON.parse(jsonValue) : [];

      // This is how you make sure that the data does not appear more than once
      const isAlreadyIngredients = ingredients.some(
        (ing) => ing.name === recipe.name
      );

      if (isAlreadyIngredients) {
        Alert.alert(
          'Already Added',
          'These ingredients is already in your favourites.'
        );
        return;
      }

      // This pushed all the data to the favourites
      ingredients.push(recipe);

      await AsyncStorage.setItem('ShoppingList', JSON.stringify(ingredients));

      Alert.alert('Saved', 'Ingredients added to your favourites!');
    } catch (error) {
      console.error('Error saving ingredients:', error);
    }
  };

  const iconSize = width > 600 ? 50 : 30;

  return (
    // This is the Scroll view for the recipe information in html
    <View className="flex-1 items-center justify-center">
      <ScrollView className="w-full">
        <View className="items-center p-3">
          <View className="flex-row justify-between w-full">
            <View className="flex-1"></View>
            <TouchableOpacity
              onPress={saveRecipeIngredients}
              className="pr-2 md:pr-4"
            >
              <Icon name="plus" size={iconSize} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveRecipeData}>
              <Icon name="heart" size={iconSize} color="#900" />
            </TouchableOpacity>
          </View>
          <Text className="text-3xl font-bold underline md:text-6xl">
            Name:
          </Text>
          <Text className="text-xl md:text-4xl">{recipe.name}</Text>
          <Text className="text-3xl font-bold underline md:text-6xl">
            Image:
          </Text>
          <Image
            className="h-60 w-60 md:h-96 md:w-96"
            source={{ uri: recipe.image }}
          />
          <Text className="text-3xl font-bold underline md:text-6xl">
            Cuisine:
          </Text>
          <Text className="text-xl md:text-4xl">{recipe.cuisine}</Text>
          <Text className="text-3xl font-bold underline md:text-6xl">
            Ingredients:
          </Text>
          {/* This is the mapping to allow the ingredients to go in list form one after another */}
          {recipe.ingredients.map((ingredient, index) => (
            <Text className="text-xl md:text-4xl" key={index}>
              {ingredient}
            </Text>
          ))}
          <Text className="text-3xl font-bold underline md:text-6xl">
            Instructions:
          </Text>
          <Text className="text-xl md:text-4xl">{recipe.instructions}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetails;
