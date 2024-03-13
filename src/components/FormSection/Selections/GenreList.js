import { useState, useEffect, memo } from 'react';
import { GenreListApiCall } from '../../MovieApi';

function GenreList({ setGenre, setIsValidRequest, tvMovieToggle }) {

    // const [genreRadioList, setGenreRadioList] = useState([]);

    // // get genre list from api
    // useEffect(() => {
    //     GenreListApiCall(tvMovieToggle).then(result => setGenreRadioList(result));
    // }, [setGenreRadioList, tvMovieToggle]);

    const [tvGenreList, setTvGenreList] = useState([]);
    const [movieGenreList, setMovieGenreList] = useState([]);

    // get genre list from api
    useEffect(() => {
        GenreListApiCall('tv').then(result => setTvGenreList(result));
        GenreListApiCall('movie').then(result => setMovieGenreList(result));

    }, [setMovieGenreList, setTvGenreList]);

    const handleChange = (e) => {
        setGenre(e.target.value);
        setIsValidRequest(true);
    }

    const genreList = tvMovieToggle === 'tv' ? tvGenreList : movieGenreList;

    return (
        <fieldset className='genre-fieldset'>
            <legend id="genre">Genre:</legend>
            {genreList.map((genre) => {
                return (
                    <div className="radio-button-container genre-buttons" key={genre.id}>
                        <input onChange={handleChange} type="radio" id={genre.id} value={genre.id} name="genre" tabIndex='0'></input>
                        <label htmlFor={genre.id}>{genre.name}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}
export default memo(GenreList);