import { use, memo } from 'react';
import { GenreListApiCall } from '../../MovieApiCache';

function GenreList({ setGenres, setIsValidRequest, tvMovieToggle, 
    currentLanguage, currentTranslation, sectionLabel, screenSize }) {
        
    const genreList = use(GenreListApiCall(tvMovieToggle, currentLanguage));

    const handleChange = (e) => {
        let newValue = [e.target.value, e.target.id];
        
        if (e.target.checked) setGenres(pre => [...pre, newValue]);
        else if (!e.target.checked) setGenres(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    const FailedStatusMessage = () => {
        return (
            <div className="error-message-container">
                <h4>{`${currentTranslation.status_messages.failed_to_load} 
                        ${currentTranslation.section_labels.genre}`    
                }</h4>
            </div>
        )
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
                <FailedStatusMessage />
            }
           
        </fieldset>
    )
}
export default memo(GenreList);