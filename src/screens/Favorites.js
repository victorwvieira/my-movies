import React, { useContext, useRef } from 'react';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text
} from 'react-native';
import { useGetMovieDetails } from '../apis'
import MovieCard from '../components/MovieCard'
import { Modalize } from 'react-native-modalize';
import MovieDetailsModal from '../components/MovieDetailsModal'
import { FavoritesMoviesListContext } from '../contexts'
import Icon from 'react-native-vector-icons/FontAwesome';

const Favorites = () => {
    const setId = useGetMovieDetails()
    const modalizeRef = useRef(null);
    const { favoriteMoviesList } = useContext(FavoritesMoviesListContext)

    const onOpen = (id) => {
        setId(id)
        modalizeRef.current?.open();
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            {
                favoriteMoviesList && favoriteMoviesList.length > 0 ?
                    <ScrollView>
                        {
                            favoriteMoviesList.map((item, index) => {
                                return <MovieCard key={index} data={item} openDetails={onOpen} />
                            })

                        }
                    </ScrollView>
                    :
                    <View style={styles.emptyContainer}>
                        <Icon name='heart-o' size={60} color="grey" />
                        <Text style={styles.emptyText}>There is no favorite movie.</Text>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
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

export default Favorites;