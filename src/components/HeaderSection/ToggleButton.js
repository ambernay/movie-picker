import { memo } from 'react';
import { FilmIcon, TvIcon } from '../Icons';

function ToggleButton({ handleTvMovieToggle, tvMovieToggle, currentTranslation }) {
    
    const iconDescription = currentTranslation['sr-only'];
    const toggleTooltip = `${currentTranslation.movies} or ${currentTranslation.tv_series}`

    return (
        <button type='button' title={toggleTooltip} id={tvMovieToggle === 'movie' ? "movie-option" : "tv-option"} 
        className="toggle-button-container" onClick={handleTvMovieToggle}>
            <span className="slider"></span>
            <figure className="toggle-left movie-icon">
                <FilmIcon />
                <figcaption className="sr-only">{iconDescription.film_icon}</figcaption>
            </figure>
            <figure className="toggle-right tv-icon">
                <TvIcon />
                <figcaption className="sr-only">{iconDescription.tv_icon}</figcaption>
            </figure>
        </button>
    )
};

export default memo(ToggleButton);