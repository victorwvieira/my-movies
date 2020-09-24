import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const GenreCard = ({ name, id, nav }) => {
    return (
        <TouchableOpacity onPress={() => nav.navigate('MoviesList', { id, name, nav })}>
            <View style={styles.mainContainer}>
                <Text style={styles.genreTextName}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'grey',
        height: 125,
        width: 150,
        borderRadius: 15,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'grey',
        shadowOpacity: 1
    },
    genreTextName: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 22
    }
});

export default GenreCard;
