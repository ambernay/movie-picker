import { useState, useEffect, memo } from 'react';
import { GenreListApiCall } from '../../MovieApiCache';

function GenreList({ setGenres, setIsValidRequest, tvMovieToggle, 
    currentLanguage, sectionLabel, currentTranslation, isFormVisible }) {
    
    const capFirstChar = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}
    const loadingMessage = capFirstChar(currentTranslation.status_messages.loading);

    const [genreList, setGenreList] = useState([]);
    const [genreStatusMessage, setGenreStatusMessage] = useState(`${loadingMessage}...`);

    // caching genre lists by media type and language
    useEffect(() => {
        if (isFormVisible) {
            setGenreStatusMessage(`${loadingMessage}...`);
            GenreListApiCall(tvMovieToggle, currentLanguage).then(result => {
                if (result) {
                    setGenreList(result);
                }
                else {
                    setGenreStatusMessage(
                        `${currentTranslation.status_messages.failed_to_load} 
                        ${currentTranslation.section_labels.genre}`
                    );
                }
                
            });
        }
    }, [tvMovieToggle, currentLanguage, isFormVisible, setGenreList]);

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
                        <h4>{`${genreStatusMessage} `}</h4>
                    </div>
                }
            </ul>
        </fieldset>
    )
}
export default memo(GenreList);