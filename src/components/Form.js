import { useState, useEffect } from 'react';
import GenreButtons from './GenreButtons.js';
import DecadeButtons from './DecadeButtons.js';
import ProviderButtons from './ProviderButtons.js';
import FormModal from './FormModal.js';

function Form({ setNewURL, setIsTrending, isTrending, setIsDropdownVisible, isDropdownVisible, currentPage, setCurrentPage }) {

    const [buttonType, setButtonType] = useState('');

    const [genre, setGenre] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [provider, setProvider] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTrending(false);

        // genre is required
        const selectedGenre = e.target.querySelector('input[name=genre]:checked');
        if (selectedGenre) {
            setGenre(selectedGenre.value);
            setIsDropdownVisible(false);
            // resets page to 1 - runs only when genre is defined
            setCurrentPage(1);

        }
        // set decade if selectedDecade is not undefined
        const selectedDecade = e.target.querySelector('input[name=decade]:checked');
        if (selectedDecade) {
            const selectedDecadeValue = selectedDecade.value.split(',');
            setStartDate(selectedDecadeValue[0]);
            setEndDate(selectedDecadeValue[1]);
        }
        // set provider if selectedProvider is not undefined
        const selectedProvider = e.target.querySelector('input[name=provider]:checked');
        if (selectedProvider) { setProvider(selectedProvider.value); }
    }


    useEffect(() => {
        const apiKey = '0a093f521e98a991f4e4cc2a12460255';
        const baseURL = 'https://api.themoviedb.org/3';
        const url = new URL(baseURL + "/discover/movie");

        const params = new URLSearchParams({
            "with_genres": genre,
            "api_key": apiKey,
            "vote_count.gte": 10,
            "sort_by": "vote_average.desc",
            "watch_region": "CA",
            "language": "en-US",
            "page": currentPage
        })
        if (startDate) params.append("primary_release_date.gte", startDate);
        if (endDate) params.append("primary_release_date.lte", endDate);
        if (provider) params.append("with_watch_providers", provider);

        url.search = params;
        setNewURL(url);

    },[isTrending, currentPage, genre, startDate, endDate, provider, setNewURL])

    // toggles form visiblity
    const formClass = isDropdownVisible ? "form-section" : "make-display-none";

    return (
        <section className={formClass}>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <nav className="form-nav">
                        <a href="#genre">Genre<span>*</span></a>
                        <a href="#decade">Decade</a>
                        <a href="#provider">Provider</a>

                        <div onClick={() => setIsDropdownVisible(false)} className="x-div-container">
                            <div className="lines a"></div>
                            <div className="lines b"></div>
                        </div>
                    </nav>
                    {/* <FormModal /> */}
                    {() => { if (!genre){ <FormModal /> }}}
                    <section className="fieldset-container">
                    <GenreButtons
                        buttonType={buttonType}
                        setButtonType={setButtonType}
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