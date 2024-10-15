/**
 * @file This is the app page which does the navigation and the splash screen
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useState } from 'react';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// These are how I have chosen to navigate within a bottom tab navigation
import DailySpecialsStackNavigation from './components/DailySpecialStackNavigation';
import CuisineStackNavigation from './components/CuisineStackNavigation';
import FavouriteStackNavigation from './components/FavouritesStackNavigation';
import ShoppingListScreen from './screens/ShoppingListScreen';

// This is the way we are able to create the bottom navigation tab
const Tab = createBottomTabNavigator();
preventAutoHideAsync();

// This is the app component
const App = () => {
  const [isReady, setIsReady] = useState(false);

  // This is the use effect that runs the splash screen
  useEffect(() => {
    const prepare = async () => {
      try {
        // Artificially delay for 5 seconds to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Other things may include fetching data, loading fonts, etc
      } catch (err) {
        console.log(err);
      } finally {
        // Note: finally is always executed
        setIsReady(true);
      }
    };
    prepare();
  }, []);

  // This is the component that allows the splash screen to show and hide
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // When the root view is loaded, hide the splash screen
      await hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    // This is the code that creates a route and a bottom tab navigation
    <View className="flex-1" onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={DailySpecialsStackNavigation}
            options={{
              headerShown: false,
              title: 'Daily Specials',
              tabBarLabel: 'Daily Specials',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="star" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Cuisines"
            component={CuisineStackNavigation}
            options={{
              headerShown: false,
              title: 'Cuisines',
              tabBarLabel: 'Cuisines',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="food-variant"
                  color={color}
                  size={size}
                />
              )
            }}
          />
          <Tab.Screen
            name="Favourite"
            component={FavouriteStackNavigation}
            options={{
              headerShown: false,
              title: 'Favourite',
              tabBarLabel: 'Favourites',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="heart"
                  color={color}
                  size={size}
                />
              )
            }}
          />
          <Tab.Screen
            name="Shopping List"
            component={ShoppingListScreen}
            options={{
              title: 'Shopping List',
              tabBarLabel: 'Shopping List',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="clipboard-list"
                  color={color}
                  size={size}
                />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
