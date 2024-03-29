import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";


const API_URL = 'http://www.omdbapi.com?apikey=b2d16d36';

const movie1 = {
    "Title": "Harry Potter and the Chamber of Secrets",
    "Year": "2002",
    "imdbID": "tt0295297",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_SX300.jpg"
}


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        console.log(movies);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);
    

    return (
        <div className="app">
            <h1>Movios</h1>

            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>


            {
                movies.length > 0
                    ? (<div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard
                                    movie={movie}
                                />
                            ))
                        }

                    </div>)
                    : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </div>
    );
}

export default App;