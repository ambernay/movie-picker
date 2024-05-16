import ToggleButton from './ToggleButton';
import FindMovieButton from './FindMovieButton';
import LanguageDropdown from '../FormSection/Dropdowns/LanguageDropdown';
import SearchBar from './SearchBar';
import { LeftArrowIcon } from '../Icons';
import { TransObj } from '../StaticObjects.js';

function Header({ handleDropdown, isDropdownVisible, setIsDropdownVisible, 
    isTrending, setIsTrending, currentPage, setCurrentPage, currentLanguage, setCurrentLanguage, 
    tvMovieToggle, setTvMovieToggle, screenSize, searchState, setSearchState, setUserSelections }) {

    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const iconDescription = currentTranslation['sr-only'];
  
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

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                                    currentTranslation={currentTranslation}
                                    screenSize={screenSize}
                                />
                                : null
                            }
                            <ToggleButton
                                tvMovieToggle={tvMovieToggle}
                                setTvMovieToggle={setTvMovieToggle}
                                setCurrentPage={setCurrentPage}
                                iconDescription={iconDescription}
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
                                    <figcaption className="sr-only">{iconDescription.back_arrow}</figcaption>
                                    <LeftArrowIcon
                                        arrowClass={toggleArrow}
                                    />
                                    <span className={styleClass}>
                                        <h4 className="result-heading">{capFirstChar(currentTranslation.trending)}</h4>
                                    </span>
                                </figure>
                            </button>
                            <LanguageDropdown
                                currentLanguage={currentLanguage}
                                setCurrentLanguage={setCurrentLanguage}
                                screenSize={screenSize}
                                currentTranslation={currentTranslation}
                            />
                            {screenSize === 'narrowScreen' ?
                                <FindMovieButton
                                    handleDropdown={handleDropdown}
                                    arrowClass={arrowClass}
                                    tvMovieToggle={tvMovieToggle}
                                    currentTranslation={currentTranslation}
                                    screenSize={screenSize}
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