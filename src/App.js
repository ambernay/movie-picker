import { useState, useEffect }  from 'react';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';

function App() {
    const apiKey = 'api_key=0a093f521e98a991f4e4cc2a12460255';
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = 'https://api.themoviedb.org/3/trending/movie/day?' + apiKey;

    const [movies, setMovies] = useState([]);


    const url = new URL(baseURL + "/discover/movie")
    url.search = new URLSearchParams({
        "with_genres": 18,
        "sort_by": "vote_average.desc",
        "vote_count.gte": 10,
        "api_key": "0a093f521e98a991f4e4cc2a12460255"
    })

    useEffect (() => {
        fetch(defaultURL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.results);
                setMovies(data.results);
            })
    }, []);

  return (
    <>
        <Header />
        <main>
            <div className='wrapper'>
                <ul>
                    {movies.map((movie) => {
                        const imageURL = 'https://image.tmdb.org/t/p/w500';
                        return (
                            <Gallery
                                key={movie.id}
                                movieData={movie}
                                imagePath={imageURL + movie.poster_path}
                            />
                        )
                    })}
                </ul>
            </div>
        </main>
    </>
  );
}

export default App;
