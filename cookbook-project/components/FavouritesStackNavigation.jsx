/**
 * @file This is the stack navigation for the Favourites
 * @author Declan de Haas
 */

// These are the imports that allow me to do stack navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavouriteRecipeScreen from '../screens/FavouriteRecipeScreen';
import RecipeDetails from '../screens/RecipeDetailsScreen';

const Stack = createNativeStackNavigator();

// This is the code that creates the stack navigation
const DailySpecialsStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favourites" component={FavouriteRecipeScreen} />
      <Stack.Screen name="Recipe Details" component={RecipeDetails} />
    </Stack.Navigator>
  );
};

export default DailySpecialsStackNavigation;
