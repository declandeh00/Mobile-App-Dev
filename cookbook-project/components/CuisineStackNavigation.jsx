/**
 * @file This file is how within the cuisine bottom tab is navigated and uses stack navigation
 * @author Declan de Haas
 */

// These are the imports that allow me to use stack navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CuisineScreen from '../screens/CuisinesScreen';
import CuisineDetailsScreen from '../screens/CuisineDetailsScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';

const Stack = createNativeStackNavigator();

// this is the component that runs the stack navigation
const CuisineStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cuisine" component={CuisineScreen} />
      <Stack.Screen name="Cuisine Recipes" component={CuisineDetailsScreen} />
      <Stack.Screen name="Recipe Details" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CuisineStackNavigation;
