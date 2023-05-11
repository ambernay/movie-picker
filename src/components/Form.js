import { useState, useEffect } from 'react';
import { GenreButtons, DecadeButtons } from './FormButtons.js';
import ProviderButtons from './ProviderButtons.js';

function Form({ setNewURL, setIsFormSubmitted, setIsDropdownVisible, isDropdownVisible }) {

    const [genreRadioButtons, setGenreRadioButtons] = useState([]);

    const apiKey = '0a093f521e98a991f4e4cc2a12460255';
    const baseURL = 'https://api.themoviedb.org/3';
    const url = new URL(baseURL + "/discover/movie");

    const genreListURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

    // const genreListURL = new URL ("https://api.themoviedb.org/3/genre/movie/list?");

    // genreListURL.search = new URLSearchParams({
    //     "api_key": apiKey,
    //     "language": "en-US",
    // })

    // get genre list from api
    useEffect(() => {
        fetch(genreListURL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setGenreRadioButtons(data.genres);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        setIsDropdownVisible(false);
        const selectedGenre = e.target.querySelector('input[name=genre]:checked');
        const selectedDecade = e.target.querySelector('input[name=decade]:checked');
        const selectedProvider = e.target.querySelector('input[name=provider]:checked');

        const selectedDecadeValue = selectedDecade.value.split(',');

        if (selectedGenre && selectedDecade) {
            url.search = new URLSearchParams({
                "with_genres": selectedGenre.value,
                "api_key": apiKey,
                "primary_release_date.gte": selectedDecadeValue[0],
                "primary_release_date.lte": selectedDecadeValue[1],
                "vote_count.gte": 10,
                "sort_by": "vote_average.desc",
                "with_watch_providers": selectedProvider.value,
                "watch_region": "CA"
            })
            setNewURL(url);
        }else{
            alert("make a selection");
        }
    }

    const formClass = isDropdownVisible ? "form-section" : "make-display-none";

    return (
        <section className={formClass}>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <nav className="form-nav">
                        <a href="#genre">Genres</a>
                        <a href="#decade">Decade</a>

                        <div onClick={() => setIsDropdownVisible(false)} className="x-div-container">
                            <div className="lines a"></div>
                            <div className="lines b"></div>
                        </div>
                    </nav>

                    <section className="fieldset-container">
                    <GenreButtons
                        genres = {genreRadioButtons}
                    />
                    <DecadeButtons />
                    <ProviderButtons />
                    </section>
                    <div className="form-button-container">
                        <button>Get Movies</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

// for year range: https://api.themoviedb.org/3/discover/movie?api_key=###&primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-12-31

export default Form;