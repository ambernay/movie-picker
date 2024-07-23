import ToggleButton from './ToggleButton';
import FindMovieButton from './FindMovieButton';
import LanguageDropdown from '../FormSection/Dropdowns/LanguageDropdown';
import RegionDropdown from '../FormSection/Dropdowns/RegionDropdown.js';
import SearchBar from './SearchBar';
import { LeftArrowIcon } from '../Icons';
import { TransObj } from '../TranslationObjects.js';

function Header({ handleDropdown, isFormVisible, setIsFormVisible, 
    isTrending, setIsTrending, currentPage, setCurrentPage, currentRegion, 
    sortOption, setSortOption, setCurrentRegion, currentLanguage, 
    setCurrentLanguage, tvMovieToggle, setTvMovieToggle, screenSize, searchState, setSearchState, setUserSelections,
    isSearchbarOpen, setIsSearchbarOpen }) {

    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const iconDescription = currentTranslation['sr-only'];
  
    // toggle visibility and orientation of arrow image
    let arrowClass = isFormVisible ? "arrow-up" : "arrow-down";

    let toggleArrow = isTrending ? "make-display-none" : '';
    let styleClass = !isTrending ? "hover-animation" : '';

    const handleTrendingButton = () => {
        if (!isTrending) {
            setIsTrending(true);
            setIsFormVisible(false);
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
                        <div className='main-title-container'>
                            <button type='button' className="main-title"
                                onClick={(e) => { handleDropdown(); e.stopPropagation(); }}>
                                    Movie Picker
                            </button>
                                <FindMovieButton
                                    handleDropdown={handleDropdown}
                                    arrowClass={arrowClass}
                                    tvMovieToggle={tvMovieToggle}
                                    currentTranslation={currentTranslation}
                                    screenSize={screenSize}
                                />
                        </div>
                        <div className="header-buttons-container">
                            <ToggleButton
                                tvMovieToggle={tvMovieToggle}
                                setTvMovieToggle={setTvMovieToggle}
                                setCurrentPage={setCurrentPage}
                                iconDescription={iconDescription}
                            />
                             <LanguageDropdown
                                currentLanguage={currentLanguage}
                                setCurrentLanguage={setCurrentLanguage}
                                screenSize={screenSize}
                                currentTranslation={currentTranslation}
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
                            <RegionDropdown
                                positionClass={'header-region'}
                                currentRegion={currentRegion}
                                setCurrentRegion={setCurrentRegion}
                                currentLanguage={currentLanguage}
                                screenSize={screenSize}
                                currentTranslation={currentTranslation}
                            />
                            <SearchBar
                                searchState={searchState} 
                                setSearchState={setSearchState}
                                tvMovieToggle={tvMovieToggle}
                                setTvMovieToggle={setTvMovieToggle}
                                setUserSelections={setUserSelections}
                                setIsTrending={setIsTrending}
                                currentLanguage={currentLanguage}
                                currentPage={currentPage}
                                sortOption={sortOption}
                                setSortOption={setSortOption}
                                setCurrentPage={setCurrentPage}
                                isSearchbarOpen={isSearchbarOpen}
                                setIsSearchbarOpen={setIsSearchbarOpen}
                            />
                        </div>
                    </div>{/* wrapper */}
                </div>
            </section>
        </header>
    )
}

export default Header;