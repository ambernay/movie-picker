import ToggleButton from './ToggleButton';
import FindMovieButton from './FindMovieButton';
import LanguageDropdown from '../FormSection/Dropdowns/LanguageDropdown';
import SearchBar from './SearchBar';
import { LeftArrowIcon } from '../Icons';

function Header({ handleDropdown, isDropdownVisible, setIsDropdownVisible, 
    isTrending, setIsTrending, currentPage, setCurrentPage, currentLanguage, setCurrentLanguage, 
    tvMovieToggle, setTvMovieToggle, screenSize, searchState, setSearchState, setUserSelections }) {

    // const subHeading = isTrending ? "Trending" : "Back to Trending";

    // toggle visibility and orientation of arrow image
    let arrowClass = isDropdownVisible ? "arrow-up" : "arrow-down";

    let toggleArrow = isTrending ? "make-display-none" : '';
    let styleClass = !isTrending ? "hover-animation" : '';

    const handleTrendingButton = () => {
        if (!isTrending) {
            setIsTrending(true);
            setIsDropdownVisible(false);
            setCurrentPage(1);
        }
    }

    return (
        <header>
            <section className="main-heading">
                <div className="wrapper">
                    <div className="heading-container">
                        <button type='button' className="main-title"
                            onClick={(e) => { handleTrendingButton(); e.stopPropagation(); }}>Movie Picker</button>
                        <div className="header-buttons-container">
                            {screenSize !== 'narrowScreen' ?
                                <FindMovieButton
                                    handleDropdown={handleDropdown}
                                    arrowClass={arrowClass}
                                    tvMovieToggle={tvMovieToggle}
                                />
                                : null
                            }
                            <ToggleButton
                                tvMovieToggle={tvMovieToggle}
                                setTvMovieToggle={setTvMovieToggle}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>{/* wrapper */}
            </section>
            <section className="sub-heading">
                <div className="result-container">
                    <div className="wrapper">
                        <div className="result-heading-container">
                            <button className="trending-button"
                                onClick={handleTrendingButton}>
                                <figure >
                                    <figcaption className="sr-only">Back arrow</figcaption>
                                    <LeftArrowIcon
                                        arrowClass={toggleArrow}
                                    />
                                    <span className={styleClass}>
                                        <h4 className="result-heading">Trending</h4>
                                    </span>
                                </figure>
                            </button>
                            <LanguageDropdown
                                currentLanguage={currentLanguage}
                                setCurrentLanguage={setCurrentLanguage}
                                screenSize={screenSize}
                            />
                            {/* <label>
                                {currentRegion[0]}
                            </label> */}
                            {screenSize === 'narrowScreen' ?
                                <FindMovieButton
                                    handleDropdown={handleDropdown}
                                    arrowClass={arrowClass}
                                    tvMovieToggle={tvMovieToggle}
                                />
                                : null
                            }
                            <SearchBar
                                searchState={searchState} 
                                setSearchState={setSearchState}
                                setUserSelections={setUserSelections}
                                setIsTrending={setIsTrending}
                                tvMovieToggle={tvMovieToggle}
                                currentLanguage={currentLanguage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>{/* wrapper */}
                </div>
            </section>
        </header>
    )
}

export default Header;