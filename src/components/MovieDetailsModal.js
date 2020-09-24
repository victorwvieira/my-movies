import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper'
import { MovieDetailsContext, LoadingContext } from '../contexts'
import { BASE_IMG_URL } from '../constants'

const MovieDetailsModal = () => {
    const { dataMovie } = useContext(MovieDetailsContext)
    const { loading } = useContext(LoadingContext)

    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.title}>{dataMovie?.title}</Text>
            </View>
            <View style={styles.divider} />
            <Swiper height={600} showsButtons={false}>
            {
                loading &&
                <ActivityIndicator size="large" />
            }
                <View>
                    <View style={styles.badgesContainer}>
                        {
                            dataMovie && dataMovie?.genres.map((item, index) => {
                                return (
                                    <View key={index} style={styles.badge}>
                                        <Text style={styles.genreBadge}>{item.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={styles.scoreContainer}>
                        <View style={parseInt(dataMovie?.vote_average) >= 8 ? [styles.scoreBadge, { backgroundColor: 'green' }] : parseInt(dataMovie?.vote_average) >= 5 ? [styles.scoreBadge, { backgroundColor: 'orange' }] : styles.scoreBadge} >
                            <Text style={styles.scoreText}>SCORE</Text>
                            <Text style={styles.score}>{parseFloat(dataMovie?.vote_average).toFixed(1)}</Text>
                        </View>
                        <View style={styles.releaseDateContainer}>
                            <Text style={styles.movieTitle}>Release date: {dataMovie?.release_date}</Text>
                            <Text style={styles.movieTitle}>Duration: {dataMovie?.runtime}min</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionContainer}>
                        {
                            dataMovie && dataMovie.tagline !== '' ? <Text style={styles.shortDescription}>{dataMovie?.tagline}</Text> : null
                        }
                        <Text style={styles.description}>{dataMovie?.overview}</Text>
                    </View>
                </View>
                <View style={styles.posterImageContainer}>
                    <Image
                        style={styles.posterImage}
                        source={{
                            uri: `${BASE_IMG_URL}${dataMovie?.poster_path}`,
                        }}
                    />
                </View>
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        justifyContent: "center"
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        letterSpacing: 1
    },
    badgesContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: "center",
        flexWrap: "wrap"
    },
    badge: {
        backgroundColor: 'grey',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        marginTop: 5
    },
    genreBadge: {
        color: 'white'
    },
    descriptionContainer: {
        marginTop: 10
    },
    description: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '500',
    },
    shortDescription: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    divider: {
        borderBottomColor: 'rgba(238, 238, 238, 1)',
        borderBottomWidth: 2,
        marginVertical: 10,
    },
    scoreContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10,
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
    scoreText: {
        color: 'white',
        fontSize: 16
    },
    releaseDateContainer: {
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    posterImageContainer: {
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    posterImage: {
        height: '90%',
        resizeMode: 'stretch',
    }
});

export default MovieDetailsModal;
