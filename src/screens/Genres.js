import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Button
} from 'react-native';
import GenreCard from '../components/GenreCard'
import { useGetListGenres } from '../apis'
import { LoadingContext } from '../contexts'
import Icon from 'react-native-vector-icons/FontAwesome';

const Genres = ({ navigation }) => {
  const listGenres = useGetListGenres()
  const { loading } = useContext(LoadingContext)
  const [searchTextValue, setSearchTextValue] = useState()

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Text style={styles.searchText}>Search a movie or select a category:</Text>
            <TextInput
              style={styles.searchInput}
              maxLength={50}
              placeholder="Search..."
              onChangeText={text => setSearchTextValue(text)}
              value={searchTextValue}
            />
            <View style={styles.buttonSearch}>
              <Icon name="search" size={20} color="rgb(0, 122, 255)" />
              <Button title="SEARCH" onPress={() => navigation.navigate('MoviesList', { search: searchTextValue, name: 'Search' })} />
            </View>
          </View>
        </View>
        <View style={styles.genresContainer}>
          <Text style={styles.sectionTitle}>CATEGORIES</Text>
          {
            loading ?
              <ActivityIndicator size="large" />
              :
              <FlatList
                numColumns={2}
                columnWrapperStyle={styles.genresList}
                data={listGenres}
                keyExtractor={(item) => item.id}
                renderItem={(data) => <GenreCard id={data.item.id} name={data.item.name} nav={navigation} />}
              />
          }
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  searchContainer: {
    flex: 0.5,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  genresContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'rgba(238, 238, 238, 0.5)',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20
  },
  genresList: {
    flex: 1,
    justifyContent: "space-between"
  },
  search: {
    flex: 1,
    width: 350,
    justifyContent: "space-evenly",
    padding: 10,
    borderRadius: 10
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  searchText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Genres;
