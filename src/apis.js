import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { API_KEY, BASE_API_URL } from './constants'
import { MoviesListContext, MovieDetailsContext, LoadingContext, FavoritesMoviesListContext } from './contexts'

export const useGetListGenres = () => {
    const [list, setList] = useState([]);
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                setList(response.data.genres)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return list
}

export const useGetListMoviesByGenre = (id = false, nextPage = 1) => {
    const [pageGenre, setPageGenre] = useState(nextPage)
    const { dataMoviesList, setDataMoviesList } = useContext(MoviesListContext)
    const { favoriteMoviesList } = useContext(FavoritesMoviesListContext)
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        if (id) {
            setLoading(true)
            axios.get(`${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${pageGenre}&with_genres=${id}`)
                .then(response => {
                    const list = response.data.results.map((item) => {
                        const favoriteListCheck = favoriteMoviesList.filter(favoriteItem => item.id === favoriteItem.id)
                        if (favoriteListCheck.length > 0) {
                            item['isFavorite'] = true
                            return item
                        } else {
                            item['isFavorite'] = false
                            return item
                        }
                    })

                    if (pageGenre === 1) {
                        setDataMoviesList(list)
                    } else {
                        const newList = dataMoviesList.concat(list)
                        setDataMoviesList(newList)
                    }

                    console.log(list);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [pageGenre])

    return { pageGenre, setPageGenre }
}

export const useGetMovieDetails = () => {
    const [id, setId] = useState(false);
    const { setDataMovies } = useContext(MovieDetailsContext)
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        if (id) {
            setLoading(true)
            axios.get(`${BASE_API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
                .then(response => {
                    setDataMovies(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [id])

    return setId
}

export const useGetListMoviesBySearch = (searchText = false, nextPage = 1) => {
    const [pageSearch, setPageSearch] = useState(nextPage)
    const { dataMoviesList, setDataMoviesList } = useContext(MoviesListContext)
    const { favoriteMoviesList } = useContext(FavoritesMoviesListContext)
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        if (searchText) {
            setLoading(true)
            axios.get(`${BASE_API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${pageSearch}&include_adult=false`)
                .then(response => {
                    const list = response.data.results.map((item) => {
                        const favoriteListCheck = favoriteMoviesList.filter(favoriteItem => item.id === favoriteItem.id)
                        if (favoriteListCheck.length > 0) {
                            item['isFavorite'] = true
                            return item
                        } else {
                            item['isFavorite'] = false
                            return item
                        }
                    })

                    if (pageSearch === 1) {
                        setDataMoviesList(list)
                    } else {
                        const newList = dataMoviesList.concat(list)
                        setDataMoviesList(newList)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [pageSearch])

    return { pageSearch, setPageSearch }
}