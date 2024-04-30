import { useState } from 'react';
import GenreList from './Selections/GenreList.js';
import DecadeList from './Selections/DecadeList.js';
import ProviderFormList from './Selections/ProviderFormList.js';
import RegionDropdown from './Dropdowns/RegionDropdown.js';
import SortByDropdown from './Dropdowns/SortByDropdown.js';
import FormModal from './FormModal.js';

function Form({ setUserSelections, setIsTrending, setIsDropdownVisible, isDropdownVisible, currentRegion, setCurrentRegion, currentPage, setCurrentPage, tvMovieToggle, screenSize, setSearchState }) {

    const [genre, setGenre] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [provider, setProvider] = useState();
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

            // scroll back to top when new gallery loads - (offset to wait for page load)
            setTimeout(() => window.scrollTo(0, 0), 100);
        }

        setUserSelections(UserSelectionURL(currentPage, tvMovieToggle, sortOption, currentRegion, startDate, endDate, provider, genre));
        setSearchState('formSearch');
    }

    // structuring the url from user selections to be passed into MovieApiCall
const UserSelectionURL = (currentPage, tvOrMovie, sortOption, currentRegion, startDate, endDate, provider, genre) => {

    const regionCode = currentRegion[0];
    let cacheKey = [`${tvOrMovie}`];

    // base params
    let storeUserSelections = {
        "vote_count.gte": 10,
        "sort_by": sortOption,
        "watch_region": regionCode,
        "language": "en-US",
    }
    // add params to userSelections object only when selected
    if (startDate && endDate) {
        storeUserSelections["primary_release_date.gte"] = startDate;
        storeUserSelections["primary_release_date.lte"] = endDate;
        cacheKey.push((`${startDate}`).split('-')[0]);
    }
    if (provider && provider.id !== "all") {
        storeUserSelections["with_watch_providers"] = provider.id;
        // discard everything after first word
        cacheKey.push((`${provider.value}`).split(' ')[0]);
    }
    if (genre && genre.id !== "all-genres") {
        console.log(genre.id);
        storeUserSelections["with_genres"] = genre.id;
        // replace spaces with underscores
        cacheKey.push((`${genre.value}`).split(' ').join('_'));
    };
    console.log(storeUserSelections);
    const selectionsQueryString = turnSelectionsObjectToQueryString(storeUserSelections);

    // split on underscores and discard value before first underscore
    let sortOptionTitle = (`${sortOption}`).split('_')[1];
    cacheKey.push(`${sortOptionTitle}`, `${regionCode}`, `${currentPage}`);
    console.log(cacheKey.join('/'));
    return [selectionsQueryString, cacheKey.join('/')];
}

function turnSelectionsObjectToQueryString(storeUserSelections) {
    const keys = Object.keys(storeUserSelections);
    const keyValuePairs = keys.map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(storeUserSelections[key]);
    });
    return (keyValuePairs.join('&'));
}
    // toggles form visiblity
    const formClass = isDropdownVisible ? "form-section" : "make-display-none";

    return (
        <section className={formClass}>
            <div className="wrapper">
                <form className='form-container' onSubmit={handleSubmit}>
                    <nav className="form-nav">

                        {screenSize === 'narrowScreen' ?
                            <RegionDropdown
                                positionClass={'form-region'}
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
                            positionClass={'form-region'}
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
                        <GenreList
                            setGenre={setGenre}
                            setIsValidRequest={setIsValidRequest}
                            tvMovieToggle={tvMovieToggle}
                        />
                        <DecadeList
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            setIsValidRequest={setIsValidRequest}
                        />
                        <ProviderFormList
                            setProvider={setProvider}
                            setIsValidRequest={setIsValidRequest}
                        />
                    </section>
                    <section className='form-bottom'>
                        <div className="form-button-container"
                        >
                            <button>{tvMovieToggle === 'movie' ? 'Get Movies' : 'Get Shows'}</button>
                        </div>
                        <SortByDropdown
                            setSortOption={setSortOption}
                        />
                    </section>

                </form>
            </div>
        </section>
    )
}

export default Form;