import { useState, useEffect, memo } from 'react';
import { GenreListApiCall } from '../../MovieApiCache';

function GenreList({ setGenres, setIsValidRequest, tvMovieToggle, 
    currentLanguage, sectionLabel, currentTranslation, isFormVisible, 
    screenSize }) {
    
    const capFirstChar = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}
    const loadingMessage = capFirstChar(currentTranslation.status_messages.loading);
    const [genreStatusMessage, setGenreStatusMessage] = useState(`${loadingMessage}...`);

    const [genreList, setGenreList] = useState([]);

    // caching genre lists by media type and language
    useEffect(() => {
        if (isFormVisible) {
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
    }, [tvMovieToggle, currentLanguage, isFormVisible, setGenreList, setGenreStatusMessage]);

    const handleChange = (e) => {
        let newValue = [e.target.value, e.target.id];
        
        if (e.target.checked) setGenres(pre => [...pre, newValue]);
        else if (!e.target.checked) setGenres(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    return (
        <fieldset className='genre-fieldset'>
            <legend id="genre">{sectionLabel}:</legend>
            {genreList?.length > 0 ? 
                <ul className='genre-buttons-list'>
                    {genreList.map((genre) => {
                        // hyphenate the longer words if no whitespace and no existing hyphens
                        if(genre.name.length > 11 && genre.name.indexOf(' ') < 0 && genre.name.indexOf('-') < 0 && screenSize !== 'narrowScreen') {
                            genre.name = `${genre.name.substring(0, genre.name.length / 2)}-${genre.name.substring(genre.name.length / 2, genre.length)}`;
                        }
                        return (
                            <li className="radio-button-container genre-buttons" key={genre.id}>
                                <input onChange={handleChange} type="checkbox" id={genre.id} value={genre.name} name="genre" tabIndex='0'></input>
                                <label htmlFor={genre.id}>{genre.name}</label>
                            </li>
                        )
                    })}
                </ul>
                :
                <div className="error-message-container">
                    <h4>{`${genreStatusMessage} `}</h4>
                </div>
            }
           
        </fieldset>
    )
}
export default memo(GenreList);