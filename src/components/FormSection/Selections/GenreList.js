import { useState, useEffect, memo } from 'react';
import { GenreListApiCall } from '../../MovieApiCache';

function GenreList({ setGenre, setIsValidRequest, tvMovieToggle }) {

    const [tvGenreList, setTvGenreList] = useState([]);
    const [movieGenreList, setMovieGenreList] = useState([]);

    // caching tv and movie genre lists
    useEffect(() => {
        GenreListApiCall('tv').then(result => setTvGenreList(result));
        GenreListApiCall('movie').then(result => setMovieGenreList(result));

    }, [setMovieGenreList, setTvGenreList]);

    const handleChange = (e) => {
        setGenre(e.target);
        setIsValidRequest(true);
    }

    const genreList = tvMovieToggle === 'tv' ? tvGenreList : movieGenreList;

    return (
        <fieldset className='genre-fieldset'>
            <legend id="genre">Genre:</legend>
            {genreList.length > 0 ? genreList.map((genre) => {
                return (
                    <div className="radio-button-container genre-buttons" key={genre.id}>
                        <input onChange={handleChange} type="radio" id={genre.id} value={genre.name} name="genre" tabIndex='0'></input>
                        <label htmlFor={genre.id}>{genre.name}</label>
                    </div>
                )
            })
                :
                <div className="error-message-container">
                    <h4>Failed to load genres</h4>
                </div>
            }
        </fieldset>
    )
}
export default memo(GenreList);