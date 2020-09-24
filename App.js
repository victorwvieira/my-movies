import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Genres from './src/screens/Genres'
import MoviesList from './src/screens/MoviesList'
import Favorites from './src/screens/Favorites'
import { MoviesListContext, MovieDetailsContext, LoadingContext, FavoritesMoviesListContext } from './src/contexts'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Favorites') {
          iconName = focused ? 'star' : 'star-o';
        } else {
          iconName = focused
            ? 'th'
            : 'th-large';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })} >
      <Tab.Screen name="Categories" component={Genres} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [dataMoviesList, setDataMoviesList] = useState([])
  const [dataMovie, setDataMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([])

  useEffect(() => {
    getFavoritesMoviesList()
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    console.log('favoriteMoviesList: ', favoriteMoviesList);
    const jsonValue = JSON.stringify({ data: favoriteMoviesList })
    AsyncStorage.setItem('@favorite', jsonValue)
  }, [favoriteMoviesList])

  const getFavoritesMoviesList = async () => {
    const jsonValue = await AsyncStorage.getItem('@favorite')
    if (jsonValue) {
      const currentList = JSON.parse(jsonValue)
      setFavoriteMoviesList(currentList.data)
    }
  }

  return (
    <NavigationContainer>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <MoviesListContext.Provider value={{ dataMoviesList, setDataMoviesList }}>
          <FavoritesMoviesListContext.Provider value={{ favoriteMoviesList, setFavoriteMoviesList }}>
            <MovieDetailsContext.Provider value={{ dataMovie, setDataMovies }}>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="MoviesList" component={MoviesList} />
              </Stack.Navigator>
            </MovieDetailsContext.Provider>
          </FavoritesMoviesListContext.Provider>
        </MoviesListContext.Provider>
      </LoadingContext.Provider>
    </NavigationContainer>
  );
};

export default App;
