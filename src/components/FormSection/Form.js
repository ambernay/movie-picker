import { useState, useEffect } from 'react';
import GenreList from './Selections/GenreList.js';
import DecadeSlider from './Selections/DecadeSlider.js';
import ProviderFormList from './Selections/ProviderFormList.js';
import { TransObj } from '../TranslationObjects.js';
import RegionDropdown from './Dropdowns/RegionDropdown.js';
import SortByDropdown from './Dropdowns/SortByDropdown.js';
import FormModal from './FormModal.js';

function Form({ setUserSelections, setIsTrending, setIsFormVisible, 
    isFormVisible, currentRegion, currentLanguage, setCurrentRegion, 
    currentPage, setCurrentPage, tvMovieToggle, screenSize, searchState, 
    setSearchState }) {

    const [genres, setGenres] = useState([]);
    const [rangeIsSelected, setRangeIsSelected] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [providers, setProviders] = useState([]);
    const [sortOption, setSortOption] = useState("vote_average.desc"); 
    const [formLabels, setFormLabels] = useState(TransObj[`${currentLanguage[0]}`]['section_labels']);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [isValidRequest, setIsValidRequest] = useState(false);

    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const formLabelTranslation = currentTranslation['section_labels'];
    const mediaType = tvMovieToggle === 'movie' ? currentTranslation.movies : currentTranslation.tv_series;
        
    // reset userSelections on dependencies on formSearch state
    useEffect(() => {
        if (searchState === 'formSearch' && !isFormVisible) {
            setUserSelections(UserSelectionURL(currentPage, tvMovieToggle, 
            sortOption, currentRegion, currentLanguage, startDate, endDate, 
            providers, genres));
        }
    },[currentPage, tvMovieToggle, currentRegion]);

    useEffect(() => {
        setFormLabels(formLabelTranslation);
    }, [currentLanguage])

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (genres.length > 0 || startDate || endDate || providers.length > 0) {
            setIsFormVisible(false);
            setIsTrending(false);
            setIsValidRequest(true);
            // resets page to 1 - runs only when genre is defined
            setCurrentPage(1);
            // scroll back to top when new gallery loads - (offset to wait for page load)
            setTimeout(() => window.scrollTo(0, 0), 100);

            setUserSelections(UserSelectionURL(currentPage, tvMovieToggle, 
                sortOption, currentRegion, currentLanguage, startDate, endDate, 
                providers, genres));
            setSearchState('formSearch');
        } 
    }

    const addQueries = (valueToUpdate, newQueryType, newValue) => {
        if (valueToUpdate[newQueryType] === undefined) {
            valueToUpdate[newQueryType] = newValue;  
        }
        else {
            // adds a pipe to the begining of each query after first
            if(valueToUpdate[newQueryType].length > 0){
                valueToUpdate[newQueryType] += `|${newValue}`;}
            else {
                valueToUpdate[newQueryType] += newValue;
            }
            }
    }

    // structuring the url from user selections to be passed into MovieApiCall
const UserSelectionURL = (currentPage, tvOrMovie, sortOption, currentRegion, 
    currentLanguage, startDate, endDate, providers, genres) => {

    const regionCode = currentRegion[0];
    const regionNativeName = currentRegion[2];
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
    if (rangeIsSelected) {
        storeUserSelections["primary_release_date.gte"] = `${startDate}-01-01`;
        storeUserSelections["primary_release_date.lte"] = `${endDate}-12-31`;
        
        // info for cacheKey and 'no results' message
        selectionsForMessage.push(`${startDate} - ${endDate}`);
        cacheKeyArr.push(`${startDate}-${endDate}`);
    }
    if (providers && providers.length > 0) {
        providers.map((provider) => {
            const [providerValue, providerID] = provider;
            addQueries(storeUserSelections, "with_watch_providers", providerID);
             // info for cacheKey and 'no results' message
            selectionsForMessage.push(providerValue);
        });
        cacheKeyArr.push((storeUserSelections["with_watch_providers"]));   
    }
    if (genres && genres.length > 0) {
        genres.map((genre) => {
            const [genreValue, genreID] = genre;
            addQueries(storeUserSelections, "with_genres", genreID);
            // info for cacheKey and 'no results' message
            // makes genre first index
            selectionsForMessage.unshift(genreValue); 
        });
        
        // replace spaces with underscores
        cacheKeyArr.push(storeUserSelections["with_genres"]);
    };
    const selectionsQueryString = turnSelectionsObjectToQueryString(storeUserSelections);
   
    selectionsForMessage.push(regionNativeName); 
    cacheKeyArr.push(`${sortOption}`, `${regionCode}`, `${langCode}`, `${currentPage}`);

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
    const formClass = isFormVisible ? "form-section" : "make-display-none";
    
    return (
        <section className={formClass}>
            <div className="wrapper">
                <form className='form-container' onSubmit={handleSubmit}>
                    <nav className="form-nav">

                        {screenSize === 'narrowScreen' && currentRegion ?
                            <RegionDropdown
                                positionClass={'form-region'}
                                currentRegion={currentRegion}
                                setCurrentRegion={setCurrentRegion}
                                currentLanguage={currentLanguage}
                                screenSize={screenSize}
                                currentTranslation={currentTranslation}
                            />
                            : null
                        }

                        <button type="button" className="x-button"
                        onClick={() => {setIsFormVisible(false); return false}}>
                            <div className="lines a"></div>
                            <div className="lines b"></div>
                        </button>

                        <a href="#genre" tabIndex='0'>{formLabels.genre}</a>
                        <a href="#decade" tabIndex='0'>{formLabels.decade}</a>
                        <a href="#provider" tabIndex='0'>{formLabels.provider}</a>

                    </nav>
                    {screenSize !== 'narrowScreen' && currentRegion ?
                        <RegionDropdown
                            positionClass={'form-region'}
                            currentRegion={currentRegion}
                            setCurrentRegion={setCurrentRegion}
                            currentLanguage={currentLanguage}
                            screenSize={screenSize}
                            currentTranslation={currentTranslation}
                        />
                        : null
                    }
                    <FormModal
                        isGenreSelected={genres}
                        submitAttempted={submitAttempted}
                        isValidRequest={isValidRequest}
                        currentTranslation={currentTranslation}
                    />
                    <section className="fieldset-container">
                        <GenreList
                            setGenres={setGenres}
                            setIsValidRequest={setIsValidRequest}
                            tvMovieToggle={tvMovieToggle}
                            currentLanguage={currentLanguage}
                            sectionLabel={capFirstChar(formLabels.genre)}
                            currentTranslation={currentTranslation}
                        />
                        <DecadeSlider
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            setRangeIsSelected={setRangeIsSelected}
                            setIsValidRequest={setIsValidRequest}
                            sectionLabel={capFirstChar(formLabels.decade)}
                        />
                        {currentRegion && isFormVisible ?
                            <ProviderFormList
                                setProviders={setProviders}
                                setIsValidRequest={setIsValidRequest}
                                sectionLabel={capFirstChar(formLabels.provider)}
                                currentRegion={currentRegion}
                                currentLanguage={currentLanguage}
                                currentTranslation={currentTranslation}
                            />
                        : null
                        }

                        
                    </section>
                    <section className='form-bottom'>
                        <div className="form-button-container">
                            <button>{
                                `${capFirstChar(currentTranslation.find)} ${capFirstChar(mediaType)}`
                            }</button>
                        </div>
                        <SortByDropdown
                            setSortOption={setSortOption}
                            currentLanguage={currentLanguage}
                            currentTranslation={currentTranslation}
                        />
                    </section>

                </form>
            </div>
        </section>
    )
}

export default Form;