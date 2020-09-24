import React, { useLayoutEffect, useContext, useRef } from 'react';
import {
    FlatList,
    ActivityIndicator,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useGetListMoviesByGenre, useGetMovieDetails, useGetListMoviesBySearch } from '../apis'
import { MoviesListContext, LoadingContext } from '../contexts'
import MovieCard from '../components/MovieCard'
import { Modalize } from 'react-native-modalize';
import MovieDetailsModal from '../components/MovieDetailsModal'
import Icon from 'react-native-vector-icons/FontAwesome';

const MoviesList = ({ route, navigation }) => {
    const { id, name, search } = route.params;
    const { pageGenre, setPageGenre } = useGetListMoviesByGenre(id)
    const { pageSearch, setPageSearch } = useGetListMoviesBySearch(search)
    const setId = useGetMovieDetails()
    const { dataMoviesList } = useContext(MoviesListContext)
    const { loading } = useContext(LoadingContext)
    const modalizeRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({ title: name, headerBackTitle: 'Back' })
    }, [])

    const onOpen = (id) => {
        setId(id)
        modalizeRef.current?.open();
    };

    const renderItem = ({ item }) => {
        return <MovieCard data={item} openDetails={onOpen} />
    }

    const loadMoreMovies = () => {
        if (id) {
            setPageGenre(pageGenre + 1)
        } else {
            setPageSearch(pageSearch + 1)
        }
    }

    return (
        <>
            {
                dataMoviesList.length > 0 ?
                    <FlatList
                        style={{ flex: 1 }}
                        data={dataMoviesList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={loadMoreMovies}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={() => {
                            if (loading) {
                                return (
                                    <ActivityIndicator size="large" />
                                )
                            } else {
                                return null
                            }
                        }}
                    />
                    :
                    <View style={styles.emptyContainer}>
                        <Icon name='frown-o' size={60} color="grey" />
                        <Text style={styles.emptyText}>There is no movie in this list.</Text>
                    </View>
            }

            <Modalize
                ref={modalizeRef}
                snapPoint={700}
                modalHeight={700}
                onClose={() => setId(false)}
            >
                <MovieDetailsModal />
            </Modalize>
        </>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },
    emptyText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: "center",
        marginVertical: 20
    }
});

export default MoviesList;