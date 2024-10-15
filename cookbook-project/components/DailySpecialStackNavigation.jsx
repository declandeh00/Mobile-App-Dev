/**
 * @file This is the stack navigation for the daily specials
 * @author Declan de Haas
 */

// These are the imports that allow me to do stack navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DailySpecialsScreen from '../screens/DailySpecialsScreen';
import RecipeDetails from '../screens/RecipeDetailsScreen';

const Stack = createNativeStackNavigator();

// This is the code that creates the stack navigation
const DailySpecialsStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Daily Specials" component={DailySpecialsScreen} />
      <Stack.Screen name="Recipe Details" component={RecipeDetails} />
    </Stack.Navigator>
  );
};

export default DailySpecialsStackNavigation;
