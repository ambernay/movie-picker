import Gallery from './components/Gallery.js';
import { useState, useEffect }  from 'react';

function App() {


    const [movies, setMovies] = useState([]);

    const url = new URL('https://api.themoviedb.org/3/trending/all/day?api_key=');

    // url.search = new URLSearchParams({
    //     title: "Legally Blonde",
    //     key: apiKey
    // })
    useEffect (() => {
        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.results);
                setMovies(data.results);
                // movieData(data.artObjects)
            })
    }, []);


  return (
    <>
        <h1>Movie Picker App</h1>
        <h2>Pick tonight's entertainment</h2>
        {movies.map((movie) => {
            return (
                <Gallery
                    key={movie.id}
                    movieData = {movie}
                />
            )
        })}

    </>
  );
}

export default App;
