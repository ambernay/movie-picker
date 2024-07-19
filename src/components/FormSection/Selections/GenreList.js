import { useState, useEffect, memo } from 'react';
import { GenreListApiCall } from '../../MovieApiCache';

function GenreList({ setGenres, setIsValidRequest, tvMovieToggle, currentLanguage, sectionLabel, currentTranslation }) {

    const [genreList, setGenreList] = useState([]);

    // caching genre lists by media type and language
    useEffect(() => {
        GenreListApiCall(tvMovieToggle, currentLanguage).then(result => setGenreList(result));
    }, [tvMovieToggle, currentLanguage, setGenreList]);

    const handleChange = (e) => {
        let newValue = [e.target.value, e.target.id];
        
        if (e.target.checked) setGenres(pre => [...pre, newValue]);
        else if (!e.target.checked) setGenres(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    return (
        <fieldset className='genre-fieldset'>
            <legend id="genre">{sectionLabel}:</legend>
            <ul className='genre-buttons-list'>
                {genreList.length > 0 ? genreList.map((genre) => {
                    return (
                        <li className="radio-button-container genre-buttons" key={genre.id}>
                            <input onChange={handleChange} type="checkbox" id={genre.id} value={genre.name} name="genre" tabIndex='0'></input>
                            <label htmlFor={genre.id}>{genre.name}</label>
                        </li>
                    )
                })
                    :
                    <div className="error-message-container">
                        <h4>{
                            `${currentTranslation.status_messages.failed_to_load} 
                            ${currentTranslation.section_labels.genre}`}
                        </h4>
                    </div>
                }
            </ul>
        </fieldset>
    )
}
export default memo(GenreList);