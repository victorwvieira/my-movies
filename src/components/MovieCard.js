import React, { useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { BASE_IMG_URL } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesMoviesListContext } from '../contexts'

const MovieCard = ({ data, openDetails }) => {
    const { favoriteMoviesList, setFavoriteMoviesList } = useContext(FavoritesMoviesListContext)

    const handleFavorite = (data) => {
        if (data.isFavorite) {
            const newDataList = favoriteMoviesList.filter(item => item.id !== data.id)
            setFavoriteMoviesList(newDataList)
        } else {
            const newData = data
            newData['isFavorite'] = true
            setFavoriteMoviesList(favoriteMoviesList ? favoriteMoviesList.concat(newData) : newData)
        }

    }

    return (
        <TouchableOpacity onPress={() => openDetails(data.id)}>
            <ImageBackground source={{ uri: `${BASE_IMG_URL}${data.backdrop_path}` }} style={styles.mainContainer}>
                <View style={styles.photoContainer}>
                    <View style={styles.firstRow}>
                        <View style={parseInt(data.vote_average) >= 8 ? [styles.scoreBadge, { backgroundColor: 'green' }] : parseInt(data.vote_average) >= 5 ? [styles.scoreBadge, { backgroundColor: 'orange' }] : styles.scoreBadge} >
                            <Text style={styles.score}>{parseFloat(data.vote_average).toFixed(1)}</Text>
                        </View>
                        <Icon onPress={() => handleFavorite(data)} name={data.isFavorite ? 'heart' : 'heart-o'} size={30} color="white" />
                    </View>
                    <View>
                        <Text style={styles.movieTitle}>{data.title}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 15,
        height: 260,
        resizeMode: "contain",
        overflow: 'hidden'
    },
    photoContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    firstRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginVertical: 10
    },
    scoreBadge: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10
    },
    score: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieTitle: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
    }
});

export default MovieCard;
