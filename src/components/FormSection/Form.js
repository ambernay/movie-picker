import { useState, useEffect } from 'react';
import GenreList from './Selections/GenreList.js';
import DecadeList from './Selections/DecadeList.js';
import ProviderFormList from './Selections/ProviderFormList.js';
import { TransObj } from '../StaticObjects.js';
import RegionDropdown from './Dropdowns/RegionDropdown.js';
import SortByDropdown from './Dropdowns/SortByDropdown.js';
import FormModal from './FormModal.js';

function Form({ setUserSelections, setIsTrending, setIsDropdownVisible, 
    isDropdownVisible, currentRegion, currentLanguage, setCurrentRegion, 
    currentPage, setCurrentPage, tvMovieToggle, screenSize, searchState, setSearchState }) {

    const [genre, setGenre] = useState();
    const [decade, setDecade] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [provider, setProvider] = useState();
    const [formLabels, setFormLabels] = useState([TransObj[`${currentLanguage[0]}`].genre, TransObj[`${currentLanguage[0]}`].decade, TransObj[`${currentLanguage[0]}`].provider]);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [isValidRequest, setIsValidRequest] = useState(false);
    const [sortOption, setSortOption] = useState("vote_average.desc");

    const currentTranslation = TransObj[`${currentLanguage[0]}`]

    // reset userSelections on dependencies on formSearch state
    useEffect(() => {
        if (searchState === 'formSearch')
        setUserSelections(UserSelectionURL(currentPage, tvMovieToggle, sortOption, currentRegion, currentLanguage, startDate, endDate, provider, genre));
    },[currentPage, tvMovieToggle, currentLanguage]);

    useEffect(() => {
        setFormLabels([currentTranslation.genre, currentTranslation.decade, currentTranslation.provider]);
    }, [currentLanguage])

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

        setUserSelections(UserSelectionURL(currentPage, tvMovieToggle, sortOption, currentRegion, currentLanguage, startDate, endDate, provider, genre));
        setSearchState('formSearch');
    }

    // structuring the url from user selections to be passed into MovieApiCall
const UserSelectionURL = (currentPage, tvOrMovie, sortOption, currentRegion, currentLanguage, startDate, endDate, provider, genre) => {

    const regionCode = currentRegion[0];
    const langCode = currentLanguage[0];
 
    let cacheKeyArr = [`${tvOrMovie}`];
    let selectionsForMessage = [];

    // base params
    let storeUserSelections = {
        "vote_count.gte": 10,
        "sort_by": sortOption,
        "watch_region": regionCode,
        "language": langCode,
    }
    // add params to userSelections object only when selected
    if (decade && decade.id !== 'all') {
        storeUserSelections["primary_release_date.gte"] = startDate;
        storeUserSelections["primary_release_date.lte"] = endDate;
        // info for cacheKey and 'no results' message
        selectionsForMessage.push(decade.id);
        cacheKeyArr.push(decade.id);
    }
    if (provider && provider.id !== "all") {
        storeUserSelections["with_watch_providers"] = provider.id;
        // info for cacheKey and 'no results' message
        selectionsForMessage.push(provider.value);
        // discard everything after first word
        cacheKeyArr.push((`${provider.value}`).split(' ')[0]);
    }
    if (genre && genre.id !== "all-genres") {
        storeUserSelections["with_genres"] = genre.id;
        // info for cacheKey and 'no results' message
        // makes genre first index
        selectionsForMessage.unshift(genre.value); 
        // replace spaces with underscores
        cacheKeyArr.push((`${genre.value}`).split(' ').join('_'));
    };
    const selectionsQueryString = turnSelectionsObjectToQueryString(storeUserSelections);

    // split on underscores and discard value before first underscore
    let sortOptionTitle = (`${sortOption}`).split('_')[1];
    selectionsForMessage.push(currentRegion[1]); 
    cacheKeyArr.push(`${sortOptionTitle}`, `${regionCode}`, `${langCode}`, `${currentPage}`);

    return [selectionsQueryString, cacheKeyArr?.join('/'), selectionsForMessage];
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
                                currentLanguage={currentLanguage}
                                screenSize={screenSize}
                            />
                            : null
                        }

                        <button onClick={() => setIsDropdownVisible(false)} className="x-button">
                            <div className="lines a"></div>
                            <div className="lines b"></div>
                        </button>

                        <a href="#genre" tabIndex='0'>{formLabels[0]}</a>
                        <a href="#decade" tabIndex='0'>{formLabels[1]}</a>
                        <a href="#provider" tabIndex='0'>{formLabels[2]}</a>

                    </nav>
                    {screenSize !== 'narrowScreen' ?
                        <RegionDropdown
                            positionClass={'form-region'}
                            currentRegion={currentRegion}
                            setCurrentRegion={setCurrentRegion}
                            currentLanguage={currentLanguage}
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
                            currentLanguage={currentLanguage}
                            sectionLabel={formLabels[0]}
                        />
                        <DecadeList
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            setDecade={setDecade}
                            setIsValidRequest={setIsValidRequest}
                            sectionLabel={formLabels[1]}
                        />
                        <ProviderFormList
                            setProvider={setProvider}
                            setIsValidRequest={setIsValidRequest}
                            sectionLabel={formLabels[2]}
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