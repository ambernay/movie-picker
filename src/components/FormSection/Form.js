import { useState, useEffect } from 'react';
import GenreList from './Selections/GenreList.js';
import DecadeList from './Selections/DecadeList.js';
import ProviderFormList from './Selections/ProviderFormList.js';
import RegionDropdown from './Dropdowns/RegionDropdown.js';
import SortByDropdown from './Dropdowns/SortByDropdown.js';
import FormModal from './FormModal.js';
import { UserSelectionURL } from '../MovieApi.js';

function Form({ setNewURL, setIsTrending, isTrending, setIsDropdownVisible, isDropdownVisible, currentRegion, setCurrentRegion, currentPage, setCurrentPage, tvMovieToggle, screenSize }) {

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
    }

    //  re-renders on page changes
    useEffect(() => {
        setNewURL(UserSelectionURL(currentPage, tvMovieToggle, sortOption, currentRegion, startDate, endDate, provider, genre));
        // eslint-disable-next-line
    }, [currentPage, isTrending, tvMovieToggle, currentRegion, sortOption, startDate, endDate, provider, genre])

    // toggles form visiblity
    const formClass = isDropdownVisible ? "form-section" : "make-display-none";

    return (
        <section className={formClass}>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
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