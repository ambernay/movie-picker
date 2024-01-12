import { useState, useEffect, memo } from 'react';

function GenreButtons({ setGenre, setIsValidRequest, tvMovieToggle }) {

    const [genreRadioButtons, setGenreRadioButtons] = useState([]);

    // get genre list from api
    useEffect(() => {

        const genreListURL = "https://api.themoviedb.org/3/genre/" + tvMovieToggle + "/list?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

        fetch(genreListURL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                // adds an All button
                data.genres.push({ "id": "all-genres", "name": "All" });
                setGenreRadioButtons(data.genres);
            }).catch(() => {
                alert("Failed to fetch genres");
            })
    }, [setGenreRadioButtons, tvMovieToggle]);

    const handleChange = (e) => {
        setGenre(e.target.value);
        setIsValidRequest(true);
    }

    return (
        <fieldset>
            <legend id="genre">Genre:</legend>
            {genreRadioButtons.map((genre) => {
                return (
                    <div className="radioButtonContainer genreButtons" key={genre.id}>
                        <input onChange={handleChange} type="radio" id={genre.id} value={genre.id} name="genre" tabIndex='0'></input>
                        <label htmlFor={genre.id}>{genre.name}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}
export default memo(GenreButtons);