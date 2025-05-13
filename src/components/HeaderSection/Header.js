import ToggleButton from './ToggleButton';
import FindMovieButton from './FindMovieButton';
import LanguageDropdown from '../FormSection/Dropdowns/LanguageDropdown';
import RegionDropdown from '../FormSection/Dropdowns/RegionDropdown.js';
import SearchBar from './SearchBar';
import { LeftArrowIcon } from '../Icons';
import { TransObj } from '../TranslationObjects.js';

function Header({ handleDropdown, isFormVisible, setIsFormVisible, 
    currentPage, setCurrentPage, currentRegion, setCurrentRegion, 
    currentLanguage, setCurrentLanguage, tvMovieToggle, 
    setTvMovieToggle, screenSize, searchState, setSearchState, 
    setUserSelections, isSearchbarOpen, setIsSearchbarOpen }) {

    const currentTranslation = TransObj[currentLanguage[0]];
    const iconDescription = currentTranslation['sr-only'];
  
    // toggle visibility and orientation of arrow image
    let arrowClass = isFormVisible ? "arrow-up" : "arrow-down";

    let toggleArrow = searchState === 'trending' ? "make-display-none" : '';
    let styleClass = searchState !== 'trending' ? "hover-animation" : '';

    const handleTrendingButton = () => {
        if (searchState !== 'trending') {
            setSearchState('trending');
            setIsFormVisible(false);
            setIsSearchbarOpen(false);
            setCurrentPage(1);
        }
    }

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleTvMovieToggle = () => {

        if (tvMovieToggle === 'movie') {
            setTvMovieToggle('tv');
        } else {
            setTvMovieToggle('movie');
        }
        setCurrentPage(1);
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
                                handleTvMovieToggle={handleTvMovieToggle}
                                tvMovieToggle={tvMovieToggle}
                                currentTranslation={currentTranslation}
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
                                currentLanguage={currentLanguage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                isSearchbarOpen={isSearchbarOpen}
                                setIsSearchbarOpen={setIsSearchbarOpen}
                                isFormVisible={isFormVisible}
                                setIsFormVisible={setIsFormVisible}
                                handleTvMovieToggle={handleTvMovieToggle}
                            />
                        </div>
                    </div>{/* wrapper */}
                </div>
            </section>
        </header>
    )
}

export default Header;