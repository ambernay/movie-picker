import { useState, useEffect } from 'react';
import GenreButtons from './Selections/GenreButtons.js';
import DecadeButtons from './Selections/DecadeButtons.js';
import ProviderButtons from './Selections/ProviderButtons.js';
import RegionDropdown from './Selections/RegionDropdown.js';
import SortBy from './Selections/SortBy.js';
import FormModal from './FormModal.js';

function Form({ setNewURL, setIsTrending, isTrending, setIsDropdownVisible, isDropdownVisible, currentPage, setCurrentPage, tvMovieToggle, screenSize }) {

    const [genre, setGenre] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [provider, setProvider] = useState();
    const [currentRegion, setCurrentRegion] = useState("CA");
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
            makeNewURL();
        }
    }

    const makeNewURL = () => {
        const apiKey = '0a093f521e98a991f4e4cc2a12460255';
        const baseURL = 'https://api.themoviedb.org/3';
        const url = new URL(baseURL + "/discover/" + tvMovieToggle);

        const params = new URLSearchParams({
            "api_key": apiKey,
            "vote_count.gte": 10,
            "sort_by": sortOption,
            "watch_region": currentRegion,
            "language": "en-US",
            "page": currentPage
        })
        // add params only when selected
        if (startDate) params.append("primary_release_date.gte", startDate);
        if (endDate) params.append("primary_release_date.lte", endDate);
        if (provider && provider.id !== "all") params.append("with_watch_providers", provider);
        if (genre && genre.id !== "all") { params.append("with_genres", genre) };

        url.search = params;
        setNewURL(url);

        // scroll back to top when new gallery loads - (offset to wait for page load)
        setTimeout(() => window.scrollTo(0, 0), 100);
    }

    //  re-renders on page changes
    useEffect(() => {
        makeNewURL();
        // eslint-disable-next-line
    }, [currentPage, isTrending, tvMovieToggle])

    // toggles form visiblity
    const formClass = isDropdownVisible ? "form-section" : "make-display-none";

    return (
        <section className={formClass}>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <nav className="form-nav">

                        {screenSize === 'narrowScreen' ?
                            <RegionDropdown
                                currentRegion={currentRegion}
                                setCurrentRegion={setCurrentRegion}
                                screenSize={screenSize}
                            />
                            : null
                        }

                        <button onClick={() => setIsDropdownVisible(false)} className="x-button">
                            <div className="lines a"></div>
                            <div className="lines b"></div>
                        </button>

                        <a href="#genre" tabIndex='0'>Genre</a>
                        <a href="#decade" tabIndex='0'>Decade</a>
                        <a href="#provider" tabIndex='0'>Provider</a>

                    </nav>
                    {screenSize !== 'narrowScreen' ?
                        <RegionDropdown
                            currentRegion={currentRegion}
                            setCurrentRegion={setCurrentRegion}
                            screenSize={screenSize}
                        />
                        : null
                    }
                    <FormModal
                        isGenreSelected={genre}
                        submitAttempted={submitAttempted}
                        isValidRequest={isValidRequest}
                    />
                    <section className="fieldset-container">
                        <GenreButtons
                            setGenre={setGenre}
                            setIsValidRequest={setIsValidRequest}
                            tvMovieToggle={tvMovieToggle}
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
                        <div className="form-button-container"
                        >
                            <button>{tvMovieToggle === 'movie' ? 'Get Movies' : 'Get Shows'}</button>
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