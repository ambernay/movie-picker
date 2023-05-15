import { useState, useEffect } from 'react';
import GenreButtons from './GenreButtons.js';
import DecadeButtons from './DecadeButtons.js';
import ProviderButtons from './ProviderButtons.js';
import Regions from './Regions.js';
import SortBy from './SortBy.js';
import FormModal from './FormModal.js';

function Form({ setNewURL, setIsTrending, isTrending, setIsDropdownVisible, isDropdownVisible, currentPage, setCurrentPage }) {

    const [genre, setGenre] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [provider, setProvider] = useState();
    const [region, setRegion] = useState("CA");
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [isValidRequest, setIsValidRequest] = useState(false);
    const [sortOption, setSortOption] = useState("vote_average.desc");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (genre || startDate || endDate || provider) {
            setIsDropdownVisible(false);
            setIsTrending(false);
            setIsValidRequest(true);
            // resets page to 1 - runs only when genre is defined
            setCurrentPage(1);
        }
    }

    useEffect(() => {
        const apiKey = '0a093f521e98a991f4e4cc2a12460255';
        const baseURL = 'https://api.themoviedb.org/3';
        const url = new URL(baseURL + "/discover/movie");

        const params = new URLSearchParams({
            "api_key": apiKey,
            "vote_count.gte": 10,
            "sort_by": sortOption,
            "watch_region": region,
            "language": "en-US",
            "page": currentPage
        })
        // add params only when selected
        if (startDate) params.append("primary_release_date.gte", startDate);
        if (endDate) params.append("primary_release_date.lte", endDate);
        if (provider && provider.id !== "all") params.append("with_watch_providers", provider);
        if (genre && genre.id !== "all") params.append("with_genres", genre);

        url.search = params;
        setNewURL(url);

    },[isTrending, currentPage, genre, startDate, endDate, provider, region, sortOption, setNewURL])

    // toggles form visiblity
    const formClass = isDropdownVisible ? "form-section" : "make-display-none";

    return (
        <section className={formClass}>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <nav className="form-nav">
                        <a href="#genre">Genre</a>
                        <a href="#decade">Decade</a>
                        <a href="#provider">Provider</a>

                        <div onClick={() => setIsDropdownVisible(false)} className="x-div-container">
                            <div className="lines a"></div>
                            <div className="lines b"></div>
                        </div>
                    </nav>

                    <Regions
                        region={region}
                        setRegion={setRegion}
                    />

                    <FormModal
                        isGenreSelected={genre}
                        submitAttempted={submitAttempted}
                        isValidRequest={isValidRequest}
                    />
                    <section className="fieldset-container">
                    <GenreButtons
                        setGenre={setGenre}
                        setIsValidRequest={setIsValidRequest}
                    />
                    <DecadeButtons
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setIsValidRequest={setIsValidRequest}
                    />
                    <ProviderButtons
                        setProvider={setProvider}
                        setIsValidRequest={setIsValidRequest}
                    />
                    </section>
                    <section className='form-bottom'>
                        <div className="form-button-container">
                            <button>Get Movies</button>
                        </div>
                        <SortBy
                            setSortOption={setSortOption}
                        />
                    </section>

                </form>
            </div>
        </section>
    )
}

export default Form;